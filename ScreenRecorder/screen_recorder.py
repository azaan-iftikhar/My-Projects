"""
Screen Recorder Pro v3.0 - Professional Edition
- Bandicam-inspired modern UI
- Cursor capture included
- Accurate FPS and audio-video sync
- No watermarks
"""

import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import threading
import time
import os
import sys
import subprocess
from datetime import datetime
import wave
import struct

# Third-party imports
import mss
import mss.tools
import cv2
import numpy as np
import sounddevice as sd
import keyboard
import imageio_ffmpeg

# Windows-specific for cursor capture
try:
    import win32gui
    import win32api
    import win32con
    HAS_WIN32 = True
except ImportError:
    HAS_WIN32 = False


class ScreenRecorderPro:
    def __init__(self, root):
        self.root = root
        self.root.title("Screen Recorder Pro")
        self.root.geometry("750x520")
        self.root.resizable(False, False)
        
        # Colors (Bandicam-inspired)
        self.colors = {
            'bg_dark': '#2b3e50',
            'bg_darker': '#1e2d3a',
            'bg_sidebar': '#243447',
            'bg_content': '#354b5e',
            'text': '#ffffff',
            'text_muted': '#8aa4bd',
            'accent': '#4a90d9',
            'accent_hover': '#5aa0e9',
            'rec_red': '#e74c3c',
            'rec_red_hover': '#ff5c4c',
            'success': '#2ecc71',
            'warning': '#f39c12',
            'border': '#3d5569'
        }
        
        self.root.configure(bg=self.colors['bg_dark'])
        
        # Center window
        self.center_window()
        
        # Recording state
        self.is_recording = False
        self.is_paused = False
        self.start_time = None
        self.pause_start_time = None
        self.total_pause_duration = 0
        
        # Recording data
        self.video_writer = None
        self.audio_frames = []
        self.frame_count = 0
        self.actual_recording_duration = 0
        self.recording_start_time = None
        self.recording_end_time = None
        
        # Settings
        self.output_dir = os.path.join(os.path.expanduser("~"), "Videos", "ScreenRecorder")
        self.fps_var = tk.IntVar(value=30)
        self.quality_var = tk.StringVar(value="High")
        self.record_audio_var = tk.BooleanVar(value=True)
        self.record_cursor_var = tk.BooleanVar(value=True)
        self.countdown_var = tk.BooleanVar(value=True)
        
        # Quality CRF values (lower = better quality, larger file)
        self.quality_crf = {
            'Low': 28,
            'Medium': 23,
            'High': 18
        }
        
        # Create output directory
        os.makedirs(self.output_dir, exist_ok=True)
        
        # Audio settings
        self.sample_rate = 44100
        self.audio_channels = 1
        
        # Get FFmpeg path
        self.ffmpeg_path = imageio_ffmpeg.get_ffmpeg_exe()
        
        # Current page
        self.current_page = "home"
        
        # Create UI
        self.create_ui()
        
        # Setup hotkeys
        self.setup_hotkeys()
        
        # Start timer update
        self.update_timer()
    
    def center_window(self):
        self.root.update_idletasks()
        width = 750
        height = 520
        x = (self.root.winfo_screenwidth() // 2) - (width // 2)
        y = (self.root.winfo_screenheight() // 2) - (height // 2)
        self.root.geometry(f"{width}x{height}+{x}+{y}")
    
    def create_ui(self):
        # Main container
        main_frame = tk.Frame(self.root, bg=self.colors['bg_dark'])
        main_frame.pack(fill="both", expand=True)
        
        # Top bar
        self.create_top_bar(main_frame)
        
        # Content area (sidebar + main)
        content_area = tk.Frame(main_frame, bg=self.colors['bg_dark'])
        content_area.pack(fill="both", expand=True)
        
        # Sidebar
        self.create_sidebar(content_area)
        
        # Main content
        self.content_frame = tk.Frame(content_area, bg=self.colors['bg_content'])
        self.content_frame.pack(side="left", fill="both", expand=True, padx=(0, 10), pady=10)
        
        # Show home page
        self.show_home_page()
    
    def create_top_bar(self, parent):
        top_bar = tk.Frame(parent, bg=self.colors['bg_darker'], height=60)
        top_bar.pack(fill="x", side="top")
        top_bar.pack_propagate(False)
        
        # Logo/Title
        title_frame = tk.Frame(top_bar, bg=self.colors['bg_darker'])
        title_frame.pack(side="left", padx=15, pady=10)
        
        tk.Label(
            title_frame,
            text="SCREEN RECORDER",
            font=("Segoe UI", 14, "bold"),
            fg=self.colors['accent'],
            bg=self.colors['bg_darker']
        ).pack(side="left")
        
        tk.Label(
            title_frame,
            text="PRO",
            font=("Segoe UI", 14, "bold"),
            fg=self.colors['rec_red'],
            bg=self.colors['bg_darker']
        ).pack(side="left", padx=5)
        
        # Right side - REC button and controls
        right_frame = tk.Frame(top_bar, bg=self.colors['bg_darker'])
        right_frame.pack(side="right", padx=15, pady=10)
        
        # Pause button
        self.pause_btn = tk.Button(
            right_frame,
            text="⏸",
            font=("Segoe UI", 16),
            fg=self.colors['text'],
            bg=self.colors['bg_sidebar'],
            activebackground=self.colors['border'],
            width=3,
            height=1,
            border=0,
            cursor="hand2",
            command=self.toggle_pause,
            state="disabled"
        )
        self.pause_btn.pack(side="left", padx=5)
        
        # REC button
        self.rec_btn_frame = tk.Frame(right_frame, bg=self.colors['rec_red'], padx=3, pady=3)
        self.rec_btn_frame.pack(side="left", padx=10)
        
        self.rec_btn = tk.Button(
            self.rec_btn_frame,
            text="REC",
            font=("Segoe UI", 14, "bold"),
            fg=self.colors['text'],
            bg=self.colors['rec_red'],
            activebackground=self.colors['rec_red_hover'],
            width=6,
            height=1,
            border=0,
            cursor="hand2",
            command=self.toggle_recording
        )
        self.rec_btn.pack()
        
        # Timer display
        self.timer_label = tk.Label(
            right_frame,
            text="00:00:00",
            font=("Consolas", 16, "bold"),
            fg=self.colors['text'],
            bg=self.colors['bg_darker']
        )
        self.timer_label.pack(side="left", padx=15)
        
        # Recording indicator (fixed width to prevent layout shift)
        self.rec_indicator = tk.Label(
            right_frame,
            text="",
            font=("Segoe UI", 12, "bold"),
            fg=self.colors['rec_red'],
            bg=self.colors['bg_darker'],
            width=6,  # Fixed width to prevent layout shift
            anchor="w"
        )
        self.rec_indicator.pack(side="left")
    
    def create_sidebar(self, parent):
        sidebar = tk.Frame(parent, bg=self.colors['bg_sidebar'], width=150)
        sidebar.pack(side="left", fill="y", padx=10, pady=10)
        sidebar.pack_propagate(False)
        
        # Menu items
        menu_items = [
            ("🏠", "Home", "home"),
            ("⚙️", "Settings", "settings"),
            ("📁", "Output", "output"),
            ("ℹ️", "About", "about")
        ]
        
        self.menu_buttons = {}
        
        for icon, text, page in menu_items:
            btn_frame = tk.Frame(sidebar, bg=self.colors['bg_sidebar'])
            btn_frame.pack(fill="x", pady=2)
            
            btn = tk.Button(
                btn_frame,
                text=f"{icon}  {text}",
                font=("Segoe UI", 11),
                fg=self.colors['text'],
                bg=self.colors['bg_sidebar'],
                activebackground=self.colors['accent'],
                activeforeground=self.colors['text'],
                anchor="w",
                padx=15,
                pady=10,
                border=0,
                cursor="hand2",
                command=lambda p=page: self.show_page(p)
            )
            btn.pack(fill="x")
            self.menu_buttons[page] = btn
        
        # Highlight current page
        self.highlight_menu("home")
    
    def highlight_menu(self, page):
        for p, btn in self.menu_buttons.items():
            if p == page:
                btn.configure(bg=self.colors['accent'])
            else:
                btn.configure(bg=self.colors['bg_sidebar'])
    
    def show_page(self, page):
        self.current_page = page
        self.highlight_menu(page)
        
        # Clear content
        for widget in self.content_frame.winfo_children():
            widget.destroy()
        
        if page == "home":
            self.show_home_page()
        elif page == "settings":
            self.show_settings_page()
        elif page == "output":
            self.show_output_page()
        elif page == "about":
            self.show_about_page()
    
    def show_home_page(self):
        # Header
        header = tk.Frame(self.content_frame, bg=self.colors['bg_content'])
        header.pack(fill="x", padx=20, pady=20)
        
        tk.Label(
            header,
            text="Screen Recording - Fullscreen",
            font=("Segoe UI", 18, "bold"),
            fg=self.colors['text'],
            bg=self.colors['bg_content']
        ).pack(anchor="w")
        
        tk.Label(
            header,
            text="Record your entire screen with audio",
            font=("Segoe UI", 11),
            fg=self.colors['text_muted'],
            bg=self.colors['bg_content']
        ).pack(anchor="w", pady=(5, 0))
        
        # Instructions
        instructions = tk.Frame(self.content_frame, bg=self.colors['bg_content'])
        instructions.pack(fill="x", padx=20, pady=10)
        
        steps = [
            "1. Configure your settings (FPS, Quality, Audio)",
            "2. Click the REC button or press F9 to start",
            "3. Press F9 again to stop recording"
        ]
        
        for step in steps:
            tk.Label(
                instructions,
                text=step,
                font=("Segoe UI", 10),
                fg=self.colors['text_muted'],
                bg=self.colors['bg_content']
            ).pack(anchor="w", pady=2)
        
        # Quick settings
        quick_frame = tk.LabelFrame(
            self.content_frame,
            text=" Quick Settings ",
            font=("Segoe UI", 10, "bold"),
            fg=self.colors['text'],
            bg=self.colors['bg_content'],
            padx=15,
            pady=10
        )
        quick_frame.pack(fill="x", padx=20, pady=15)
        
        # FPS
        fps_frame = tk.Frame(quick_frame, bg=self.colors['bg_content'])
        fps_frame.pack(fill="x", pady=5)
        
        tk.Label(
            fps_frame,
            text="Frame Rate:",
            font=("Segoe UI", 10),
            fg=self.colors['text'],
            bg=self.colors['bg_content'],
            width=12,
            anchor="w"
        ).pack(side="left")
        
        for fps in [15, 30, 60]:
            rb = tk.Radiobutton(
                fps_frame,
                text=f"{fps} FPS",
                variable=self.fps_var,
                value=fps,
                font=("Segoe UI", 10),
                fg=self.colors['text'],
                bg=self.colors['bg_content'],
                selectcolor=self.colors['bg_darker'],
                activebackground=self.colors['bg_content'],
                activeforeground=self.colors['text']
            )
            rb.pack(side="left", padx=15)
        
        # Quality
        quality_frame = tk.Frame(quick_frame, bg=self.colors['bg_content'])
        quality_frame.pack(fill="x", pady=5)
        
        tk.Label(
            quality_frame,
            text="Quality:",
            font=("Segoe UI", 10),
            fg=self.colors['text'],
            bg=self.colors['bg_content'],
            width=12,
            anchor="w"
        ).pack(side="left")
        
        for qual in ["Low", "Medium", "High"]:
            rb = tk.Radiobutton(
                quality_frame,
                text=qual,
                variable=self.quality_var,
                value=qual,
                font=("Segoe UI", 10),
                fg=self.colors['text'],
                bg=self.colors['bg_content'],
                selectcolor=self.colors['bg_darker'],
                activebackground=self.colors['bg_content'],
                activeforeground=self.colors['text']
            )
            rb.pack(side="left", padx=15)
        
        # Checkboxes row
        checkbox_frame = tk.Frame(quick_frame, bg=self.colors['bg_content'])
        checkbox_frame.pack(fill="x", pady=10)
        
        tk.Checkbutton(
            checkbox_frame,
            text="🎤 Record Microphone",
            variable=self.record_audio_var,
            font=("Segoe UI", 10),
            fg=self.colors['text'],
            bg=self.colors['bg_content'],
            selectcolor=self.colors['bg_darker'],
            activebackground=self.colors['bg_content']
        ).pack(side="left", padx=(0, 20))
        
        tk.Checkbutton(
            checkbox_frame,
            text="🖱️ Show Cursor",
            variable=self.record_cursor_var,
            font=("Segoe UI", 10),
            fg=self.colors['text'],
            bg=self.colors['bg_content'],
            selectcolor=self.colors['bg_darker'],
            activebackground=self.colors['bg_content']
        ).pack(side="left", padx=(0, 20))
        
        tk.Checkbutton(
            checkbox_frame,
            text="⏱️ 3s Countdown",
            variable=self.countdown_var,
            font=("Segoe UI", 10),
            fg=self.colors['text'],
            bg=self.colors['bg_content'],
            selectcolor=self.colors['bg_darker'],
            activebackground=self.colors['bg_content']
        ).pack(side="left")
        
        # Hotkeys info
        hotkey_frame = tk.Frame(self.content_frame, bg=self.colors['bg_darker'])
        hotkey_frame.pack(fill="x", padx=20, pady=10)
        
        tk.Label(
            hotkey_frame,
            text="⌨️ Hotkeys",
            font=("Segoe UI", 10, "bold"),
            fg=self.colors['text'],
            bg=self.colors['bg_darker'],
            padx=10,
            pady=5
        ).pack(side="left")
        
        tk.Label(
            hotkey_frame,
            text="F9 = Start/Stop    |    F10 = Pause/Resume",
            font=("Segoe UI", 10),
            fg=self.colors['text_muted'],
            bg=self.colors['bg_darker'],
            padx=10,
            pady=5
        ).pack(side="left")
        
        # Status
        self.status_label = tk.Label(
            self.content_frame,
            text="Ready to record",
            font=("Segoe UI", 11),
            fg=self.colors['success'],
            bg=self.colors['bg_content']
        )
        self.status_label.pack(pady=10)
    
    def show_settings_page(self):
        tk.Label(
            self.content_frame,
            text="Settings",
            font=("Segoe UI", 18, "bold"),
            fg=self.colors['text'],
            bg=self.colors['bg_content']
        ).pack(anchor="w", padx=20, pady=20)
        
        # Settings content
        settings_frame = tk.Frame(self.content_frame, bg=self.colors['bg_content'])
        settings_frame.pack(fill="both", expand=True, padx=20)
        
        tk.Label(
            settings_frame,
            text="Recording settings are available on the Home page.\n\nAdditional settings coming soon...",
            font=("Segoe UI", 11),
            fg=self.colors['text_muted'],
            bg=self.colors['bg_content'],
            justify="left"
        ).pack(anchor="w")
    
    def show_output_page(self):
        tk.Label(
            self.content_frame,
            text="Output Folder",
            font=("Segoe UI", 18, "bold"),
            fg=self.colors['text'],
            bg=self.colors['bg_content']
        ).pack(anchor="w", padx=20, pady=20)
        
        # Current path
        path_frame = tk.Frame(self.content_frame, bg=self.colors['bg_darker'])
        path_frame.pack(fill="x", padx=20, pady=10)
        
        tk.Label(
            path_frame,
            text="Current folder:",
            font=("Segoe UI", 10),
            fg=self.colors['text_muted'],
            bg=self.colors['bg_darker'],
            padx=10,
            pady=10
        ).pack(side="left")
        
        self.path_label = tk.Label(
            path_frame,
            text=self.output_dir,
            font=("Segoe UI", 10),
            fg=self.colors['accent'],
            bg=self.colors['bg_darker'],
            padx=10,
            pady=10
        )
        self.path_label.pack(side="left", fill="x", expand=True)
        
        # Buttons
        btn_frame = tk.Frame(self.content_frame, bg=self.colors['bg_content'])
        btn_frame.pack(fill="x", padx=20, pady=10)
        
        tk.Button(
            btn_frame,
            text="📁 Change Folder",
            font=("Segoe UI", 10),
            fg=self.colors['text'],
            bg=self.colors['accent'],
            activebackground=self.colors['accent_hover'],
            padx=15,
            pady=8,
            border=0,
            cursor="hand2",
            command=self.change_output_folder
        ).pack(side="left", padx=(0, 10))
        
        tk.Button(
            btn_frame,
            text="📂 Open Folder",
            font=("Segoe UI", 10),
            fg=self.colors['text'],
            bg=self.colors['bg_sidebar'],
            activebackground=self.colors['border'],
            padx=15,
            pady=8,
            border=0,
            cursor="hand2",
            command=lambda: os.startfile(self.output_dir)
        ).pack(side="left")
    
    def show_about_page(self):
        tk.Label(
            self.content_frame,
            text="About",
            font=("Segoe UI", 18, "bold"),
            fg=self.colors['text'],
            bg=self.colors['bg_content']
        ).pack(anchor="w", padx=20, pady=20)
        
        about_text = """
Screen Recorder Pro v3.0

A professional screen recording application with:
• Full screen recording with cursor capture
• Microphone audio recording
• Multiple FPS options (15, 30, 60)
• Quality presets (Low, Medium, High)
• Perfect audio-video synchronization
• No watermarks - completely free!

Created with Antigravity AI
        """
        
        tk.Label(
            self.content_frame,
            text=about_text,
            font=("Segoe UI", 11),
            fg=self.colors['text_muted'],
            bg=self.colors['bg_content'],
            justify="left"
        ).pack(anchor="w", padx=20)
    
    def change_output_folder(self):
        new_dir = filedialog.askdirectory(initialdir=self.output_dir)
        if new_dir:
            self.output_dir = new_dir
            if hasattr(self, 'path_label'):
                self.path_label.config(text=self.output_dir)
    
    def setup_hotkeys(self):
        try:
            keyboard.add_hotkey('F9', self.toggle_recording)
            keyboard.add_hotkey('F10', self.toggle_pause)
        except:
            pass
    
    def toggle_recording(self):
        if not self.is_recording:
            self.start_recording()
        else:
            self.stop_recording()
    
    def toggle_pause(self):
        if not self.is_recording:
            return
        
        if self.is_paused:
            self.is_paused = False
            if self.pause_start_time:
                self.total_pause_duration += time.time() - self.pause_start_time
            self.pause_btn.config(text="⏸")
            self.update_status("Recording...", self.colors['success'])
        else:
            self.is_paused = True
            self.pause_start_time = time.time()
            self.pause_btn.config(text="▶")
            self.update_status("Paused", self.colors['warning'])
    
    def update_status(self, text, color):
        if hasattr(self, 'status_label') and self.status_label.winfo_exists():
            self.status_label.config(text=text, fg=color)
    
    def start_recording(self):
        if self.countdown_var.get():
            self.do_countdown()
        else:
            self.begin_recording()
    
    def do_countdown(self):
        self.rec_btn.config(state="disabled")
        
        def countdown():
            for i in range(3, 0, -1):
                self.root.after(0, lambda x=i: self.timer_label.config(text=f"00:00:0{x}"))
                self.root.after(0, lambda: self.update_status(f"Starting in {i}...", self.colors['warning']))
                time.sleep(1)
            self.root.after(0, self.begin_recording)
        
        threading.Thread(target=countdown, daemon=True).start()
    
    def begin_recording(self):
        self.is_recording = True
        self.is_paused = False
        self.frame_count = 0
        self.total_pause_duration = 0
        self.pause_start_time = None
        self.audio_frames = []
        
        # Create temp file paths
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.temp_video_path = os.path.join(self.output_dir, f"temp_video_{timestamp}.avi")
        self.temp_audio_path = os.path.join(self.output_dir, f"temp_audio_{timestamp}.wav")
        self.final_output_path = os.path.join(self.output_dir, f"Recording_{timestamp}.mp4")
        
        # Get screen dimensions
        with mss.mss() as sct:
            monitor = sct.monitors[1]
            self.screen_width = monitor["width"]
            self.screen_height = monitor["height"]
            self.monitor_left = monitor["left"]
            self.monitor_top = monitor["top"]
        
        # Initialize video writer
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        self.video_writer = cv2.VideoWriter(
            self.temp_video_path,
            fourcc,
            self.fps_var.get(),
            (self.screen_width, self.screen_height)
        )
        
        # Update UI
        self.rec_btn.config(text="STOP", bg=self.colors['bg_sidebar'], state="normal")
        self.pause_btn.config(state="normal")
        self.update_status("Recording...", self.colors['success'])
        
        # Record the PRECISE start time
        self.recording_start_time = time.perf_counter()
        self.start_time = time.time()
        
        # Start recording threads
        self.video_thread = threading.Thread(target=self.record_video, daemon=True)
        self.video_thread.start()
        
        if self.record_audio_var.get():
            self.audio_thread = threading.Thread(target=self.record_audio, daemon=True)
            self.audio_thread.start()
    
    def draw_cursor_on_frame(self, frame):
        """Draw cursor on the frame"""
        if not self.record_cursor_var.get() or not HAS_WIN32:
            return frame
        
        try:
            # Get cursor position
            cursor_pos = win32api.GetCursorPos()
            x = cursor_pos[0] - self.monitor_left
            y = cursor_pos[1] - self.monitor_top
            
            # Only draw if cursor is within screen bounds
            if 0 <= x < self.screen_width and 0 <= y < self.screen_height:
                # Draw cursor (white circle with black border)
                cv2.circle(frame, (x, y), 10, (255, 255, 255), -1)
                cv2.circle(frame, (x, y), 10, (0, 0, 0), 2)
                cv2.circle(frame, (x, y), 3, (0, 0, 0), -1)
        except:
            pass
        
        return frame
    
    def record_video(self):
        """Record video with accurate timing"""
        target_fps = self.fps_var.get()
        frame_interval = 1.0 / target_fps
        
        with mss.mss() as sct:
            monitor = sct.monitors[1]
            next_frame_time = time.perf_counter()
            
            while self.is_recording:
                if self.is_paused:
                    time.sleep(0.05)
                    next_frame_time = time.perf_counter()
                    continue
                
                current_time = time.perf_counter()
                
                # Wait until it's time for the next frame
                if current_time < next_frame_time:
                    sleep_time = next_frame_time - current_time
                    if sleep_time > 0.001:
                        time.sleep(sleep_time - 0.001)
                    continue
                
                # Capture frame
                img = sct.grab(monitor)
                frame = np.array(img)
                frame = cv2.cvtColor(frame, cv2.COLOR_BGRA2BGR)
                
                # Draw cursor
                frame = self.draw_cursor_on_frame(frame)
                
                # Write frame
                if self.video_writer is not None:
                    self.video_writer.write(frame)
                    self.frame_count += 1
                
                # Schedule next frame
                next_frame_time += frame_interval
                
                # If we're falling behind, reset timing
                if current_time > next_frame_time + frame_interval:
                    next_frame_time = current_time + frame_interval
        
        # Record end time
        self.recording_end_time = time.perf_counter()
    
    def record_audio(self):
        """Record audio with precise timing"""
        audio_buffer = []
        
        def callback(indata, frames, time_info, status):
            if self.is_recording and not self.is_paused:
                audio_buffer.append(indata.copy())
        
        try:
            with sd.InputStream(
                samplerate=self.sample_rate,
                channels=self.audio_channels,
                dtype=np.int16,
                callback=callback,
                blocksize=1024
            ):
                while self.is_recording:
                    time.sleep(0.01)
        except Exception as e:
            print(f"Audio error: {e}")
        
        self.audio_frames = audio_buffer
    
    def stop_recording(self):
        """Stop recording and process the video"""
        self.is_recording = False
        self.is_paused = False
        
        # Calculate actual recording duration
        if self.recording_start_time and self.recording_end_time:
            self.actual_recording_duration = self.recording_end_time - self.recording_start_time - self.total_pause_duration
        elif self.start_time:
            self.actual_recording_duration = time.time() - self.start_time - self.total_pause_duration
        
        # Update UI
        self.rec_btn.config(text="REC", bg=self.colors['rec_red'])
        self.pause_btn.config(text="⏸", state="disabled")
        self.timer_label.config(text="00:00:00")
        self.update_status("Processing video...", self.colors['warning'])
        
        # Save in background
        threading.Thread(target=self.save_recording, daemon=True).start()
    
    def save_recording(self):
        """Save and merge audio/video with perfect sync"""
        try:
            # Close video writer
            if self.video_writer is not None:
                self.video_writer.release()
                self.video_writer = None
            
            time.sleep(0.3)
            
            # Calculate actual FPS achieved
            if self.actual_recording_duration > 0 and self.frame_count > 0:
                actual_fps = self.frame_count / self.actual_recording_duration
            else:
                actual_fps = self.fps_var.get()
            
            print(f"=== Recording Stats ===")
            print(f"Frames: {self.frame_count}")
            print(f"Duration: {self.actual_recording_duration:.2f}s")
            print(f"Target FPS: {self.fps_var.get()}")
            print(f"Actual FPS: {actual_fps:.2f}")
            
            # Save audio
            has_audio = self.record_audio_var.get() and len(self.audio_frames) > 0
            audio_duration = 0
            
            if has_audio:
                audio_data = np.concatenate(self.audio_frames, axis=0)
                audio_duration = len(audio_data) / self.sample_rate
                
                print(f"Audio samples: {len(audio_data)}")
                print(f"Audio duration: {audio_duration:.2f}s")
                
                with wave.open(self.temp_audio_path, 'wb') as wf:
                    wf.setnchannels(self.audio_channels)
                    wf.setsampwidth(2)
                    wf.setframerate(self.sample_rate)
                    wf.writeframes(audio_data.tobytes())
            
            # Get CRF based on quality setting
            crf = self.quality_crf.get(self.quality_var.get(), 23)
            
            # Merge with FFmpeg
            if has_audio and os.path.exists(self.temp_video_path) and os.path.exists(self.temp_audio_path):
                self.root.after(0, lambda: self.update_status("Syncing audio & video...", self.colors['warning']))
                
                # Use audio duration to calculate the correct video FPS for sync
                if audio_duration > 0 and self.frame_count > 0:
                    sync_fps = self.frame_count / audio_duration
                else:
                    sync_fps = actual_fps
                
                print(f"Sync FPS: {sync_fps:.2f}")
                
                cmd = [
                    self.ffmpeg_path,
                    '-y',
                    '-r', str(sync_fps),  # Input video FPS adjusted for sync
                    '-i', self.temp_video_path,
                    '-i', self.temp_audio_path,
                    '-c:v', 'libx264',
                    '-preset', 'medium',
                    '-crf', str(crf),
                    '-c:a', 'aac',
                    '-b:a', '192k',
                    '-pix_fmt', 'yuv420p',
                    '-movflags', '+faststart',
                    self.final_output_path
                ]
                
                result = subprocess.run(
                    cmd,
                    capture_output=True,
                    text=True,
                    creationflags=subprocess.CREATE_NO_WINDOW if sys.platform == 'win32' else 0
                )
                
                if result.returncode == 0:
                    try:
                        os.remove(self.temp_video_path)
                        os.remove(self.temp_audio_path)
                    except:
                        pass
                    
                    self.root.after(0, lambda: self.update_status(
                        f"✓ Saved: {os.path.basename(self.final_output_path)}",
                        self.colors['success']
                    ))
                else:
                    print(f"FFmpeg error: {result.stderr}")
                    self.root.after(0, lambda: self.update_status("Error during processing", self.colors['rec_red']))
            
            elif os.path.exists(self.temp_video_path):
                # Video only
                self.root.after(0, lambda: self.update_status("Converting video...", self.colors['warning']))
                
                cmd = [
                    self.ffmpeg_path,
                    '-y',
                    '-r', str(actual_fps),
                    '-i', self.temp_video_path,
                    '-c:v', 'libx264',
                    '-preset', 'medium',
                    '-crf', str(crf),
                    '-pix_fmt', 'yuv420p',
                    '-movflags', '+faststart',
                    self.final_output_path
                ]
                
                subprocess.run(
                    cmd,
                    capture_output=True,
                    creationflags=subprocess.CREATE_NO_WINDOW if sys.platform == 'win32' else 0
                )
                
                try:
                    os.remove(self.temp_video_path)
                except:
                    pass
                
                self.root.after(0, lambda: self.update_status(
                    f"✓ Saved: {os.path.basename(self.final_output_path)}",
                    self.colors['success']
                ))
        
        except Exception as e:
            print(f"Save error: {e}")
            self.root.after(0, lambda: self.update_status(f"Error: {str(e)[:40]}", self.colors['rec_red']))
        
        finally:
            self.audio_frames = []
            self.frame_count = 0
    
    def update_timer(self):
        """Update timer display"""
        if self.is_recording and not self.is_paused and self.start_time:
            elapsed = time.time() - self.start_time - self.total_pause_duration
            hours = int(elapsed // 3600)
            minutes = int((elapsed % 3600) // 60)
            seconds = int(elapsed % 60)
            self.timer_label.config(text=f"{hours:02d}:{minutes:02d}:{seconds:02d}")
            
            # Blinking indicator
            if int(elapsed * 2) % 2 == 0:
                self.rec_indicator.config(text="● REC")
            else:
                self.rec_indicator.config(text="")
        else:
            self.rec_indicator.config(text="")
        
        self.root.after(100, self.update_timer)
    
    def on_closing(self):
        if self.is_recording:
            if messagebox.askyesno("Recording in Progress", "Stop recording and exit?"):
                self.stop_recording()
                time.sleep(2)
        self.root.destroy()


def main():
    root = tk.Tk()
    
    # Set icon
    script_dir = os.path.dirname(os.path.abspath(__file__))
    icon_path = os.path.join(script_dir, "recorder.ico")
    try:
        root.iconbitmap(icon_path)
    except:
        pass
    
    app = ScreenRecorderPro(root)
    root.protocol("WM_DELETE_WINDOW", app.on_closing)
    root.mainloop()


if __name__ == "__main__":
    main()

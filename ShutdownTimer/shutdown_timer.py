"""
Auto Shutdown Timer - Windows Application
A beautiful GUI application to schedule automatic Windows shutdown.
"""

import tkinter as tk
from tkinter import ttk, messagebox
import subprocess
import os


class ShutdownTimer:
    def __init__(self, root):
        self.root = root
        self.root.title("⏰ Auto Shutdown Timer")
        self.root.geometry("400x500")
        self.root.resizable(False, False)
        self.root.configure(bg="#1a1a2e")
        
        # Center the window
        self.center_window()
        
        # Variables
        self.hours = tk.StringVar(value="0")
        self.minutes = tk.StringVar(value="30")
        self.seconds = tk.StringVar(value="0")
        self.remaining_seconds = 0
        self.timer_running = False
        self.timer_id = None
        
        # Create UI
        self.create_widgets()
    
    def center_window(self):
        """Center the window on screen"""
        self.root.update_idletasks()
        width = 400
        height = 500
        x = (self.root.winfo_screenwidth() // 2) - (width // 2)
        y = (self.root.winfo_screenheight() // 2) - (height // 2)
        self.root.geometry(f"{width}x{height}+{x}+{y}")
    
    def create_widgets(self):
        """Create all UI widgets"""
        
        # Title
        title_frame = tk.Frame(self.root, bg="#1a1a2e")
        title_frame.pack(pady=20)
        
        title_label = tk.Label(
            title_frame,
            text="🖥️ Auto Shutdown Timer",
            font=("Segoe UI", 20, "bold"),
            fg="#e94560",
            bg="#1a1a2e"
        )
        title_label.pack()
        
        subtitle_label = tk.Label(
            title_frame,
            text="Schedule your PC to shutdown automatically",
            font=("Segoe UI", 10),
            fg="#888888",
            bg="#1a1a2e"
        )
        subtitle_label.pack(pady=5)
        
        # Timer Display
        self.display_frame = tk.Frame(self.root, bg="#16213e", padx=30, pady=20)
        self.display_frame.pack(pady=20, padx=20, fill="x")
        
        self.countdown_label = tk.Label(
            self.display_frame,
            text="00:00:00",
            font=("Consolas", 48, "bold"),
            fg="#00ff88",
            bg="#16213e"
        )
        self.countdown_label.pack()
        
        self.status_label = tk.Label(
            self.display_frame,
            text="Set timer and press Start",
            font=("Segoe UI", 10),
            fg="#888888",
            bg="#16213e"
        )
        self.status_label.pack(pady=5)
        
        # Input Frame
        input_frame = tk.Frame(self.root, bg="#1a1a2e")
        input_frame.pack(pady=20)
        
        # Hours
        hours_frame = tk.Frame(input_frame, bg="#1a1a2e")
        hours_frame.pack(side="left", padx=10)
        
        tk.Label(
            hours_frame,
            text="Hours",
            font=("Segoe UI", 10),
            fg="#ffffff",
            bg="#1a1a2e"
        ).pack()
        
        hours_spinbox = tk.Spinbox(
            hours_frame,
            from_=0,
            to=23,
            width=5,
            font=("Segoe UI", 16),
            textvariable=self.hours,
            justify="center",
            bg="#16213e",
            fg="#ffffff",
            buttonbackground="#e94560"
        )
        hours_spinbox.pack()
        
        # Minutes
        minutes_frame = tk.Frame(input_frame, bg="#1a1a2e")
        minutes_frame.pack(side="left", padx=10)
        
        tk.Label(
            minutes_frame,
            text="Minutes",
            font=("Segoe UI", 10),
            fg="#ffffff",
            bg="#1a1a2e"
        ).pack()
        
        minutes_spinbox = tk.Spinbox(
            minutes_frame,
            from_=0,
            to=59,
            width=5,
            font=("Segoe UI", 16),
            textvariable=self.minutes,
            justify="center",
            bg="#16213e",
            fg="#ffffff",
            buttonbackground="#e94560"
        )
        minutes_spinbox.pack()
        
        # Seconds
        seconds_frame = tk.Frame(input_frame, bg="#1a1a2e")
        seconds_frame.pack(side="left", padx=10)
        
        tk.Label(
            seconds_frame,
            text="Seconds",
            font=("Segoe UI", 10),
            fg="#ffffff",
            bg="#1a1a2e"
        ).pack()
        
        seconds_spinbox = tk.Spinbox(
            seconds_frame,
            from_=0,
            to=59,
            width=5,
            font=("Segoe UI", 16),
            textvariable=self.seconds,
            justify="center",
            bg="#16213e",
            fg="#ffffff",
            buttonbackground="#e94560"
        )
        seconds_spinbox.pack()
        
        # Buttons Frame
        button_frame = tk.Frame(self.root, bg="#1a1a2e")
        button_frame.pack(pady=20)
        
        # Start Button
        self.start_button = tk.Button(
            button_frame,
            text="▶ START",
            font=("Segoe UI", 12, "bold"),
            fg="#ffffff",
            bg="#00aa55",
            activebackground="#00cc66",
            activeforeground="#ffffff",
            width=12,
            height=2,
            cursor="hand2",
            border=0,
            command=self.start_timer
        )
        self.start_button.pack(side="left", padx=10)
        
        # Cancel Button
        self.cancel_button = tk.Button(
            button_frame,
            text="⏹ CANCEL",
            font=("Segoe UI", 12, "bold"),
            fg="#ffffff",
            bg="#e94560",
            activebackground="#ff5577",
            activeforeground="#ffffff",
            width=12,
            height=2,
            cursor="hand2",
            border=0,
            command=self.cancel_timer,
            state="disabled"
        )
        self.cancel_button.pack(side="left", padx=10)
        
        # Quick Timer Buttons
        quick_frame = tk.Frame(self.root, bg="#1a1a2e")
        quick_frame.pack(pady=10)
        
        tk.Label(
            quick_frame,
            text="Quick Timers:",
            font=("Segoe UI", 10),
            fg="#888888",
            bg="#1a1a2e"
        ).pack(pady=5)
        
        quick_buttons_frame = tk.Frame(quick_frame, bg="#1a1a2e")
        quick_buttons_frame.pack()
        
        quick_times = [("15 min", 15), ("30 min", 30), ("1 hour", 60), ("2 hours", 120)]
        
        for text, mins in quick_times:
            btn = tk.Button(
                quick_buttons_frame,
                text=text,
                font=("Segoe UI", 9),
                fg="#ffffff",
                bg="#0f3460",
                activebackground="#1a4a80",
                width=8,
                cursor="hand2",
                border=0,
                command=lambda m=mins: self.set_quick_time(m)
            )
            btn.pack(side="left", padx=5)
        
        # Footer
        footer_label = tk.Label(
            self.root,
            text="Made with ❤️ by Antigravity AI",
            font=("Segoe UI", 8),
            fg="#555555",
            bg="#1a1a2e"
        )
        footer_label.pack(side="bottom", pady=10)
    
    def set_quick_time(self, minutes):
        """Set a quick timer value"""
        hours = minutes // 60
        mins = minutes % 60
        self.hours.set(str(hours))
        self.minutes.set(str(mins))
        self.seconds.set("0")
        self.update_display(hours * 3600 + mins * 60)
    
    def start_timer(self):
        """Start the shutdown timer"""
        try:
            h = int(self.hours.get())
            m = int(self.minutes.get())
            s = int(self.seconds.get())
            
            if h == 0 and m == 0 and s == 0:
                messagebox.showwarning("Invalid Time", "Please set a time greater than 0!")
                return
            
            self.remaining_seconds = h * 3600 + m * 60 + s
            self.timer_running = True
            
            # Update UI state
            self.start_button.config(state="disabled")
            self.cancel_button.config(state="normal")
            self.status_label.config(text="⏳ Shutdown scheduled...", fg="#ffaa00")
            
            # Start countdown
            self.countdown()
            
        except ValueError:
            messagebox.showerror("Error", "Please enter valid numbers!")
    
    def countdown(self):
        """Update the countdown display"""
        if self.timer_running and self.remaining_seconds > 0:
            self.update_display(self.remaining_seconds)
            self.remaining_seconds -= 1
            self.timer_id = self.root.after(1000, self.countdown)
        elif self.timer_running and self.remaining_seconds <= 0:
            self.execute_shutdown()
    
    def update_display(self, total_seconds):
        """Update the countdown display"""
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        seconds = total_seconds % 60
        self.countdown_label.config(text=f"{hours:02d}:{minutes:02d}:{seconds:02d}")
    
    def cancel_timer(self):
        """Cancel the shutdown timer"""
        self.timer_running = False
        
        if self.timer_id:
            self.root.after_cancel(self.timer_id)
            self.timer_id = None
        
        # Cancel any scheduled Windows shutdown
        subprocess.run(["shutdown", "/a"], capture_output=True, shell=True)
        
        # Reset UI
        self.start_button.config(state="normal")
        self.cancel_button.config(state="disabled")
        self.countdown_label.config(text="00:00:00")
        self.status_label.config(text="Timer cancelled", fg="#e94560")
        
        messagebox.showinfo("Cancelled", "Shutdown timer has been cancelled!")
    
    def execute_shutdown(self):
        """Execute the Windows shutdown command"""
        self.status_label.config(text="🔴 Shutting down...", fg="#ff0000")
        self.countdown_label.config(text="GOODBYE!", fg="#ff0000")
        
        # Give user a final warning
        result = messagebox.askyesno(
            "Shutdown Now",
            "Time's up! Your PC will shutdown in 30 seconds.\n\nDo you want to proceed?",
            icon="warning"
        )
        
        if result:
            # Schedule shutdown in 30 seconds
            subprocess.run(["shutdown", "/s", "/t", "30", "/c", "Auto Shutdown Timer - Shutting down..."], shell=True)
            self.root.destroy()
        else:
            self.cancel_timer()


def main():
    root = tk.Tk()
    
    # Set icon
    import os
    script_dir = os.path.dirname(os.path.abspath(__file__))
    icon_path = os.path.join(script_dir, "timer.ico")
    try:
        root.iconbitmap(icon_path)
    except:
        pass
    
    app = ShutdownTimer(root)
    root.mainloop()


if __name__ == "__main__":
    main()

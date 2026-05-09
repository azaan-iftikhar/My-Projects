// three-scene.js - Three.js 3D World Manager

const ThreeEngine = (function() {
    let scene, camera, renderer;
    let environment;
    
    // Meshes
    let playerCarGroup;
    let trafficGroup;
    let itemsGroup;
    let sceneryGroup;

    // Materials
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.9 });
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x2e8b57, roughness: 1 });
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.9 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.1, metalness: 0.8 });
    const coinMat = new THREE.MeshStandardMaterial({ color: 0xffdd00, emissive: 0x332200, metalness: 0.8, roughness: 0.2 });
    
    // Geometry caching
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const cylinderGeo = new THREE.CylinderGeometry(1, 1, 1, 16);
    
    // Constants mapping to old game logic
    const ROAD_WIDTH = 40; 
    const LANE_COUNT = 4;
    const CAMERA_OFFSET_Z = 18;
    const CAMERA_OFFSET_Y = 6;

    let roadLines = [];
    let streetLights = [];
    let guardrails = [];

    function init(container) {
        // Setup Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87CEEB); // Daylight sky blue
        scene.fog = new THREE.FogExp2(0x87CEEB, 0.003); // Lighter fog for daylight
        
        // Setup Camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        // Setup Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.insertBefore(renderer.domElement, container.firstChild);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Bright daylight ambient
        scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
        sunLight.position.set(-100, 200, -50);
        sunLight.castShadow = true;
        
        // Optimize shadow map
        sunLight.shadow.camera.top = 200;
        sunLight.shadow.camera.bottom = -200;
        sunLight.shadow.camera.left = -200;
        sunLight.shadow.camera.right = 200;
        scene.add(sunLight);
        
        // Groups
        trafficGroup = new THREE.Group();
        itemsGroup = new THREE.Group();
        sceneryGroup = new THREE.Group();
        scene.add(trafficGroup);
        scene.add(itemsGroup);
        scene.add(sceneryGroup);

        // Build Environment
        buildRoad();
        
        // Window Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    function createRoadTexture() {
        // Create an asphalt texture canvas to give a sense of speed
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, 256, 256);
        // Add noise/specks
        for(let i=0; i<1000; i++) {
            ctx.fillStyle = Math.random() > 0.5 ? '#1a1a1a' : '#0a0a0a';
            ctx.fillRect(Math.random()*256, Math.random()*256, 2, 8); // Streaks
        }
        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(4, 1000);
        return tex;
    }

    function createGrassTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#2e8b57'; // SeaGreen
        ctx.fillRect(0, 0, 256, 256);
        // Add noise/grass blades
        for(let i=0; i<3000; i++) {
            ctx.fillStyle = Math.random() > 0.5 ? '#226633' : '#3cb371';
            ctx.fillRect(Math.random()*256, Math.random()*256, 4, 16);
        }
        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(50, 4000);
        return tex;
    }

    function buildRoad() {
        environment = new THREE.Group();

        // Asphalt Road
        roadMat.map = createRoadTexture();
        const roadGeo = new THREE.PlaneGeometry(ROAD_WIDTH, 20000);
        const roadMesh = new THREE.Mesh(roadGeo, roadMat);
        roadMesh.rotation.x = -Math.PI / 2;
        roadMesh.receiveShadow = true;
        environment.add(roadMesh);

        // Grass/Sides
        grassMat.map = createGrassTexture();
        const grassGeo = new THREE.PlaneGeometry(2000, 20000);
        const grassMesh = new THREE.Mesh(grassGeo, grassMat);
        grassMesh.rotation.x = -Math.PI / 2;
        grassMesh.position.y = -0.1;
        grassMesh.receiveShadow = true;
        environment.add(grassMesh);

        scene.add(environment);

        // We will spawn moving road lines, streetlights, and guardrails dynamically
        for(let i=0; i<30; i++) {
            createStreetLight(i * 40);
        }
        for(let i=0; i<60; i++) {
            createGuardrail(i * 10);
        }
    }

    function createGuardrail(zOffset) {
        const railMat = new THREE.MeshStandardMaterial({color: 0xdddddd, metalness: 0.8, roughness: 0.2});
        const postMat = new THREE.MeshStandardMaterial({color: 0x555555});
        
        [-1, 1].forEach(side => {
            const group = new THREE.Group();
            
            // Horizontal metal barrier
            const rail = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.8, 10), railMat);
            rail.position.set((ROAD_WIDTH/2 + 1) * side, 1.2, -zOffset);
            
            // Vertical support post
            const post = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.0), postMat);
            post.position.set((ROAD_WIDTH/2 + 1) * side, 0.5, -zOffset);
            
            group.add(rail);
            group.add(post);
            sceneryGroup.add(group);
            guardrails.push({ group, z: zOffset, side });
        });
    }

    function createStreetLight(zOffset) {
        const side = Math.random() > 0.5 ? 1 : -1;
        
        const pole = new THREE.Mesh(boxGeo, new THREE.MeshStandardMaterial({color: 0x333333}));
        pole.scale.set(0.5, 15, 0.5);
        pole.position.set((ROAD_WIDTH/2 + 2) * side, 7.5, -zOffset);
        
        const lamp = new THREE.Mesh(boxGeo, new THREE.MeshBasicMaterial({color: 0xffffcc}));
        lamp.scale.set(3, 0.5, 1);
        lamp.position.set((ROAD_WIDTH/2 + 0.5) * side, 15, -zOffset);
        
        // Actual light
        const light = new THREE.PointLight(0xffffcc, 1.0, 50);
        light.position.set((ROAD_WIDTH/2 - 2) * side, 14, -zOffset);

        sceneryGroup.add(pole);
        sceneryGroup.add(lamp);
        sceneryGroup.add(light);
        
        streetLights.push({ group: [pole, lamp, light], z: zOffset });
    }

    function createCarMesh(colorHex, isPlayer = false) {
        const car = new THREE.Group();
        
        const bodyMat = new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.7, roughness: 0.3 });
        
        // Lower body
        const body = new THREE.Mesh(boxGeo, bodyMat);
        body.scale.set(3.5, 1.2, 8);
        body.position.y = 1;
        body.castShadow = true;
        car.add(body);
        
        // Cabin
        const cabin = new THREE.Mesh(boxGeo, glassMat);
        cabin.scale.set(3.0, 1.0, 4);
        cabin.position.set(0, 2.0, -0.5);
        cabin.castShadow = true;
        car.add(cabin);

        // Tires
        const tirePos = [
            [-1.9, 0.5, 2.5], [1.9, 0.5, 2.5],
            [-1.9, 0.5, -2.5], [1.9, 0.5, -2.5]
        ];
        tirePos.forEach(pos => {
            const tire = new THREE.Mesh(cylinderGeo, tireMat);
            tire.rotation.z = Math.PI / 2;
            tire.scale.set(0.8, 0.6, 0.8);
            tire.position.set(...pos);
            car.add(tire);
        });

        // Glowing Taillights
        const tLightMat = new THREE.MeshBasicMaterial({color: 0xff0000});
        const tLight1 = new THREE.Mesh(boxGeo, tLightMat);
        tLight1.scale.set(0.8, 0.3, 0.2);
        tLight1.position.set(-1.0, 1.2, 4.1);
        car.add(tLight1);

        const tLight2 = new THREE.Mesh(boxGeo, tLightMat);
        tLight2.scale.set(0.8, 0.3, 0.2);
        tLight2.position.set(1.0, 1.2, 4.1);
        car.add(tLight2);

        if (isPlayer) {
            // Player headlights cast light
            const spotLight = new THREE.SpotLight(0xffffee, 2.0, 150, Math.PI/5, 0.5, 1);
            spotLight.position.set(0, 1.2, -4.5);
            spotLight.target.position.set(0, 0, -30);
            car.add(spotLight);
            car.add(spotLight.target);
        } else {
            // NPC headlights just glow
            const hLightMat = new THREE.MeshBasicMaterial({color: 0xffffff});
            const hLight1 = new THREE.Mesh(boxGeo, hLightMat);
            hLight1.scale.set(0.8, 0.3, 0.2);
            hLight1.position.set(-1.0, 1.2, -4.1);
            car.add(hLight1);
            
            const hLight2 = new THREE.Mesh(boxGeo, hLightMat);
            hLight2.scale.set(0.8, 0.3, 0.2);
            hLight2.position.set(1.0, 1.2, -4.1);
            car.add(hLight2);
        }

        return car;
    }

    function initPlayer(colorHex) {
        if (playerCarGroup) scene.remove(playerCarGroup);
        playerCarGroup = createCarMesh(colorHex, true);
        scene.add(playerCarGroup);
        return playerCarGroup;
    }

    function addTrafficCar(id, x, z, speed, colorHex) {
        const mesh = createCarMesh(colorHex, false);
        mesh.position.set(x * ROAD_WIDTH * 0.5, 0, -z);
        mesh.userData = { id, speed };
        trafficGroup.add(mesh);
        return mesh;
    }

    function addCoin(id, x, z) {
        const coin = new THREE.Mesh(cylinderGeo, coinMat);
        coin.rotation.x = Math.PI / 2;
        coin.scale.set(1.5, 0.2, 1.5);
        coin.position.set(x * ROAD_WIDTH * 0.5, 1.5, -z);
        coin.castShadow = true;
        coin.userData = { id };
        itemsGroup.add(coin);
        return coin;
    }

    function update(dt, player, trafficData, itemsData, shakeX, shakeY) {
        if (!playerCarGroup) return;

        // Visual speed effect: stretch FOV smoothly based on speed using dt
        const speedRatio = player.speed / 220; 
        const targetFov = 75 + (speedRatio * 20); 
        camera.fov += (targetFov - camera.fov) * 5 * dt; // Frame-independent lerp
        camera.updateProjectionMatrix();

        // Player movement
        playerCarGroup.position.x = player.x * ROAD_WIDTH * 0.5;
        playerCarGroup.position.z = -player.z;
        
        // Traffic Rider Physics: Lean the car model based on lateral velocity
        const targetCarRotation = -player.velocityX * 0.15;
        playerCarGroup.rotation.z += (targetCarRotation - playerCarGroup.rotation.z) * 10 * dt;

        // Camera dynamics: tight follow to eliminate rubber-banding lag
        const targetCamX = playerCarGroup.position.x * 0.6 + shakeX;
        camera.position.x = targetCamX; // Rigid follow (no lerp) instantly kills camera stutter
        camera.position.y = CAMERA_OFFSET_Y + shakeY - (speedRatio * 1.5); 
        camera.position.z = playerCarGroup.position.z + CAMERA_OFFSET_Z;
        
        // Traffic Rider Physics: Bank the camera slightly when turning
        const targetCamRotation = -player.velocityX * 0.05;
        camera.rotation.z += (targetCamRotation - camera.rotation.z) * 5 * dt;
        
        camera.lookAt(playerCarGroup.position.x, 0, playerCarGroup.position.z - 40);

        // Scroll the texture on the road using dt (drastically lowered multiplier to prevent visual aliasing/lag illusion)
        roadMat.map.offset.y -= (player.speed * 0.01 * dt);
        grassMat.map.offset.y -= (player.speed * 0.01 * dt);

        // Infinite environment rolling effect (wrap road so it never ends)
        environment.position.z = -player.z % 5000;

        // Sync Guardrails relative to player
        guardrails.forEach(gr => {
            if (-player.z + gr.z < -20) {
                gr.z += 600; // Loop 600 units ahead
                gr.group.children[0].position.z = -gr.z;
                gr.group.children[1].position.z = -gr.z;
            }
        });

        // Sync Streetlights relative to player
        streetLights.forEach(sl => {
            if (-player.z + sl.z < -20) {
                // If light passed behind camera, move it far ahead
                sl.z += 1200; 
                sl.group.forEach(mesh => mesh.position.z = -sl.z);
            }
        });

        // Sync Traffic using Object Pooling for C++ level performance
        // Hide all traffic first
        trafficGroup.children.forEach(c => c.visible = false);
        
        trafficData.forEach((t, index) => {
            let mesh;
            if (index < trafficGroup.children.length) {
                // Reuse existing mesh from pool
                mesh = trafficGroup.children[index];
                mesh.visible = true;
                // Update color if necessary (simplified: we just reuse whatever color it had to save performance)
            } else {
                // Expand pool
                mesh = addTrafficCar(t.id, t.x, t.z, t.speed, t.color);
            }
            mesh.position.x = t.x * ROAD_WIDTH * 0.5;
            mesh.position.z = -t.z;
        });

        // Sync Coins using Object Pooling
        itemsGroup.children.forEach(c => c.visible = false);
        
        const activeItems = itemsData.filter(i => i.active);
        activeItems.forEach((i, index) => {
            let mesh;
            if (index < itemsGroup.children.length) {
                mesh = itemsGroup.children[index];
                mesh.visible = true;
            } else {
                mesh = addCoin(i.id, i.x, i.z);
            }
            mesh.position.x = i.x * ROAD_WIDTH * 0.5;
            mesh.position.z = -i.z;
            mesh.rotation.y += 0.05; // Spin coins
        });

        renderer.render(scene, camera);
    }

    function reset() {
        while(trafficGroup.children.length > 0){ trafficGroup.remove(trafficGroup.children[0]); }
        while(itemsGroup.children.length > 0){ itemsGroup.remove(itemsGroup.children[0]); }
        
        // Reset streetlights and guardrails
        streetLights.forEach((sl, index) => {
            sl.z = index * 40;
            sl.group.children.forEach(mesh => mesh.position.z = -sl.z);
        });
        guardrails.forEach((gr, index) => {
            gr.z = Math.floor(index / 2) * 10;
            gr.group.children.forEach(mesh => mesh.position.z = -gr.z);
        });
    }

    return {
        init,
        initPlayer,
        update,
        reset
    };
})();

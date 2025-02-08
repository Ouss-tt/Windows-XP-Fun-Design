/*folder selection effect*/

document.querySelectorAll(".taskbar-folder").forEach(folder => {
    folder.addEventListener("click", function () {
        // Remove "selected" class from all folders
        document.querySelectorAll(".taskbar-folder").forEach(el => el.classList.remove("selected"));
        
        // Add "selected" class to the clicked folder
        this.classList.add("selected");
    });
});


/*Screen Drag and move*/
document.addEventListener('DOMContentLoaded', () => {
    const screen = document.querySelector('.screen');
    const items = document.querySelectorAll('.screen-item');
    
    let activeItem = null;
    let initialX = 0;
    let initialY = 0;
    let currentX = 0;
    let currentY = 0;
    let xOffset = 0;
    let yOffset = 0;

    // Initialize positions for items (grid-like)
    items.forEach((item, index) => {
        // Set initial positions in a grid
        const row = Math.floor(index / 4); // 4 items per row
        const col = index % 4;
        
        item.style.left = (col * 100 + 20) + 'px';
        item.style.top = (row * 100 + 20) + 'px';
        
        // Add selection effect
        item.addEventListener('click', (e) => {
            items.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
        });
    });

    function dragStart(e) {
        if (e.target.closest('.screen-item')) {
            activeItem = e.target.closest('.screen-item');
            
            // Add dragging class
            activeItem.classList.add('dragging');
            
            if (e.type === "touchstart") {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }
        }
    }

    function dragEnd(e) {
        if (activeItem) {
            // Store final position
            xOffset = currentX;
            yOffset = currentY;
            
            // Remove dragging class
            activeItem.classList.remove('dragging');
            activeItem = null;
        }
    }

    function drag(e) {
        if (activeItem) {
            e.preventDefault();

            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            // Keep item within screen bounds
            const bounds = screen.getBoundingClientRect();
            const itemBounds = activeItem.getBoundingClientRect();
            
            if (currentX < 0) currentX = 0;
            if (currentY < 0) currentY = 0;
            if (currentX > bounds.width - itemBounds.width) 
                currentX = bounds.width - itemBounds.width;
            if (currentY > bounds.height - itemBounds.height)
                currentY = bounds.height - itemBounds.height;

            setTranslate(currentX, currentY, activeItem);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.left = xPos + 'px';
        el.style.top = yPos + 'px';
    }

    // Add event listeners
    screen.addEventListener("touchstart", dragStart, false);
    screen.addEventListener("touchend", dragEnd, false);
    screen.addEventListener("touchmove", drag, false);

    screen.addEventListener("mousedown", dragStart, false);
    screen.addEventListener("mouseup", dragEnd, false);
    screen.addEventListener("mousemove", drag, false);
});
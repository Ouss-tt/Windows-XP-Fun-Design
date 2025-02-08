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
    // Store positions for each item
    const positions = {
        item1: { x: 0, y: 0 },
        item2: { x: 0, y: 0 },
        item3: { x: 0, y: 0 },
        item4: { x: 0, y: 0 },
        item5: { x: 0, y: 0 },
        item6: { x: 0, y: 0 }
    };

    // Set initial positions
    for (let i = 1; i <= 6; i++) {
        const item = document.getElementById(`item${i}`);
        const row = Math.floor((i - 1) / 2); // 2 items per row
        const col = (i - 1) % 2;
        
        item.style.left = (col * 100 + 20) + 'px';
        item.style.top = (row * 100 + 20) + 'px';
        
        // Initialize drag functionality for each item
        initDragElement(item);
    }

    function initDragElement(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        element.addEventListener('mousedown', dragMouseDown);

        function dragMouseDown(e) {
            e.preventDefault();
            // Get mouse cursor position at startup
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            // Remove selection from other items
            document.querySelectorAll('.screen-item').forEach(item => {
                item.classList.remove('selected');
            });
            element.classList.add('selected');
            
            // Add event listeners for drag and release
            document.addEventListener('mousemove', elementDrag);
            document.addEventListener('mouseup', closeDragElement);
        }

        function elementDrag(e) {
            e.preventDefault();
            // Calculate new position
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            // Get screen boundaries
            const screen = document.querySelector('.screen');
            const screenRect = screen.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            // Calculate new position
            let newTop = element.offsetTop - pos2;
            let newLeft = element.offsetLeft - pos1;

            // Add boundary constraints
            newTop = Math.max(0, Math.min(newTop, screenRect.height - elementRect.height));
            newLeft = Math.max(0, Math.min(newLeft, screenRect.width - elementRect.width));

            // Set element's new position
            element.style.top = newTop + "px";
            element.style.left = newLeft + "px";

            // Store new position
            positions[element.id] = { x: newLeft, y: newTop };
        }

        function closeDragElement() {
            // Remove event listeners
            document.removeEventListener('mousemove', elementDrag);
            document.removeEventListener('mouseup', closeDragElement);
        }
    }
});
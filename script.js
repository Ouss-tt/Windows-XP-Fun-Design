document.querySelectorAll(".taskbar-folder").forEach(folder => {
    folder.addEventListener("click", function () {
        // Remove "selected" class from all folders
        document.querySelectorAll(".taskbar-folder").forEach(el => el.classList.remove("selected"));
        
        // Add "selected" class to the clicked folder
        this.classList.add("selected");
    });
});

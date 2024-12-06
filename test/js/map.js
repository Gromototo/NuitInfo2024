// const draggableElement = document.getElementById('draggable');

//     draggableElement.addEventListener('mousedown', (event) => {
//       let shiftX = event.clientX - draggableElement.getBoundingClientRect().left;
//       let shiftY = event.clientY - draggableElement.getBoundingClientRect().top;

//       const moveAt = (pageX, pageY) => {
//         draggableElement.style.left = pageX - shiftX + 'px';
//         draggableElement.style.top = pageY - shiftY + 'px';
//       };

//       const onMouseMove = (event) => {
//         moveAt(event.pageX, event.pageY);
//       };

//       document.addEventListener('mousemove', onMouseMove);

//       draggableElement.addEventListener('mouseup', () => {
//         document.removeEventListener('mousemove', onMouseMove);
//       });

//       draggableElement.ondragstart = () => false; // Prevent default drag behavior
//     });

const draggableElement = document.getElementById('draggable');

    let shiftX = 0;
    let shiftY = 0;

    // Function to start dragging
    const startDrag = (event) => {
      const isTouchEvent = event.type.startsWith("touch");
      const clientX = isTouchEvent ? event.touches[0].clientX : event.clientX;
      const clientY = isTouchEvent ? event.touches[0].clientY : event.clientY;

      shiftX = clientX - draggableElement.getBoundingClientRect().left;
      shiftY = clientY - draggableElement.getBoundingClientRect().top;

      const moveAt = (pageX, pageY) => {
        draggableElement.style.left = pageX - shiftX + 'px';
        draggableElement.style.top = pageY - shiftY + 'px';
      };

      const onMove = (moveEvent) => {
        const isTouchMove = moveEvent.type === "touchmove";
        const moveX = isTouchMove ? moveEvent.touches[0].clientX : moveEvent.clientX;
        const moveY = isTouchMove ? moveEvent.touches[0].clientY : moveEvent.clientY;

        moveAt(moveX, moveY);
      };

      const endDrag = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", endDrag);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", endDrag);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", endDrag);
      document.addEventListener("touchmove", onMove);
      document.addEventListener("touchend", endDrag);
    };

    // Event listeners for drag start
    draggableElement.addEventListener("mousedown", startDrag);
    draggableElement.addEventListener("touchstart", startDrag);

    // Prevent default drag behavior
    draggableElement.ondragstart = () => false;

onmessage = function(event){
    debugger
    var data = event;
    console.log('Message');
    var updatedData = data.map(element => {
        // we create a new object for each element with the updated positions and quaternion
        return {
            meshposition: { x: element.bodyposition.x, y: element.bodyposition.y, z: element.bodyposition.z },
            bodyposition: element.bodyposition,
            quaternion: element.quaternion
        };
    });
    // send the updated data back to the main thread
    postMessage(updatedData);
}

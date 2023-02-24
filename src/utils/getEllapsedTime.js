export const getEllapsedTime = (created) => {
    let now_ms = Date.now();
    let ellapsed_ms = now_ms - created * 1000;
    let ellapsed_minutes = Math.floor((ellapsed_ms / 1000 / 60) % 60);
    let ellapsed_hours = Math.floor((ellapsed_ms / 1000 / 60 / 60) % 24);
    if (ellapsed_hours > 0) return ellapsed_hours + ' hours';
    return ellapsed_minutes + ' minutes';
}
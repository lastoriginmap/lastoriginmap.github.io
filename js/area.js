function show_enemy(enemy_name) {
    var popupX = (window.screen.width / 2) - (450 / 2);
    var popupY= (window.screen.height /2) - (400 / 2);
    window.open(enemy_name, "popup_enemy", 'status=no, height=400, width=463, left='+ popupX + ', top='+ popupY + ', screenX='+ popupX + ', screenY= '+ popupY);
}
temp = location.href.split("?");
data = temp[1].split("&");
skill = ['', '', '', '', ''];
for (i in data) {
    if (data[i] == -1) {
        data[i] = '???';
    }
}
HP = data.shift();
strength = data.shift();
critical = data.shift() + '%';
defense = data.shift();
accuracy = data.shift() + '%';
agility = data.shift();
dodge = data.shift() + '%';
for (damage in data) {
    skill[damage] = data[damage];
}
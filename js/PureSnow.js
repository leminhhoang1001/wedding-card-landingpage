let snowflakes_count = 200;

// let base_css = ``; // Put your custom base css here

if (typeof total !== 'undefined'){
    snowflakes_count = total;
}


// This function allows you to turn on and off the snow
function toggle_snow() {
    let check_box = document.getElementById("toggle_snow");
    if (check_box.checked == true) {
        document.getElementById('snow').style.display = "block";
    }
    else {
        document.getElementById('snow').style.display = "none";
    }
}

// Tạo một animation CSS chung cho tất cả bông tuyết
function createGeneralSnowflakeCSS() {
    let snowflake_name = "snowflake";
    
    // Tạo một animation @keyframes chung cho tất cả bông tuyết
    // Chúng ta sẽ sử dụng biến CSS để tùy chỉnh chuyển động
    let general_rule = `
        @keyframes fall {
            100% {
                transform: translate(var(--x-end), 100vh) scale(var(--scale));
            }
        }
        .${snowflake_name} {
            animation-name: fall;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-duration: var(--duration);
            animation-delay: var(--delay);
            transform: translate(var(--x-start), -10px) scale(var(--scale));
            opacity: var(--opacity);
        }
    `;
    add_css(general_rule);
}

// Creating snowflakes
function spawn_snow(snow_density = 200) {
    let final_density = snow_density;

    // Giảm số lượng bông tuyết trên màn hình nhỏ để tối ưu hiệu suất
    if (window.innerWidth <= 768) {
        final_density = 50; 
    }

    // Giảm density đi 1 như code ban đầu
    final_density -= 1;

    for (let x = 0; x < final_density; x++) {
        let board = document.createElement('div');
        board.className = "snowflake";

        // Gán các biến CSS ngẫu nhiên cho từng bông tuyết
        let random_x = Math.random() * 100; // vw
        let random_offset = random_range(-100000, 100000) * 0.0002; // vw;
        let random_x_end = random_x + random_offset;
        let random_scale = Math.random();
        let fall_duration = random_range(10, 50) * 0.5; // s
        let fall_delay = random_int(30) * -1; // s
        let opacity_ = Math.random();

        board.style.setProperty('--x-start', `${random_x}vw`);
        board.style.setProperty('--x-end', `${random_x_end}vw`);
        board.style.setProperty('--scale', `${random_scale}`);
        board.style.setProperty('--duration', `${fall_duration}s`);
        board.style.setProperty('--delay', `${fall_delay}s`);
        board.style.setProperty('--opacity', `${opacity_}`);

        document.getElementById('snow').appendChild(board);
    }
}

// Append style for each snowflake to the head
function add_css(rule) {
    let css = document.createElement('style');
    css.type = 'text/css';
    css.appendChild(document.createTextNode(rule)); // Support for the rest
    document.getElementsByTagName("head")[0].appendChild(css);
}

// Math
function random_int(value = 100){
    return Math.floor(Math.random() * value) + 1;
}

function random_range(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Load the rules and execute after the DOM loads
window.onload = function() {
    setTimeout(function(){    
        createGeneralSnowflakeCSS(); // Gọi hàm tạo CSS chung
        spawn_snow(snowflakes_count); // Gọi hàm tạo bông tuyết
    }, 6000);
};

// TODO add progress bar for slower clients

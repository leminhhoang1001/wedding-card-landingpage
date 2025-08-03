const card = document.getElementById('card')
    // const playmusic = document.getElementById('card')
const tapHint = document.getElementById('tap-hint')
let id;
const button = document.getElementById('muteaudio');
const musicOn = '<i class="fas fa-volume-high"></i>';
const musicOff = '<i class="fas fa-volume-xmark"></i>';

let muteSound = new Howl({
    src: ['./audio/wedding-song.mp3'],
    // mute: false,
    // autoplay: true,
    loop: true,
    html5: true,
    volume: 1
});
muteSound.autoUnlock = false;


// Sự kiện lật thiệp
card.addEventListener('click', function(e) {
    e.preventDefault();
    $('html, body').css({ overflow: 'hidden' }); // Vô hiệu hóa cuộn khi lật thiệp
    card.classList.toggle('flipped'); // Lật thiệp
    setTimeout(()=>{
        var typed = new Typed('.message-content', {
            strings: ["You are <br>warmly invited to attend the wedding ceremony of"],
            typeSpeed: 60,
            backSpeed: 0,
            loop: false,
            showCursor: false,
            // Bước 2: Hiệu ứng đánh máy kết thúc, hiển thị khối tiếp theo
            onComplete: function() {
                setTimeout(()=>{
                    // Bước 3: Hiển thị khối tên cô dâu chú rể
                    var groomBrideBlock = document.querySelector('.groom-bride');
                    groomBrideBlock.classList.add('visible');

                    // Bước 4: Chờ một chút rồi hiển thị khối date-time
                    setTimeout(()=> {
                        var dateTimeBlock = document.querySelector('.date-time');
                        dateTimeBlock.classList.add('visible');

                        // Bước 5: Chờ một chút rồi hiển thị khối .wedding-address
                        setTimeout(()=> {
                            var dateTimeBlock = document.querySelector('.wedding-address');
                            dateTimeBlock.classList.add('visible');
                        }, 4000); // Đợi 4 giây sau khi tên hiện lên

                    }, 4000); // Đợi 4 giây sau khi tên hiện lên
                },2000);
            }
        });
    },2000);
});

// play music once tim flip card
card.addEventListener('click', playchristmas, { once: true });

function playchristmas() {
    muteSound.play();
}

button.addEventListener("click", () => {
    // if the audio is muted, set the btn.innerHTML to unmuteIcon
    // otherwise, set it to the muteIcon
    console.log("Nút đã được bấm!"); 
    console.log("Trạng thái mute hiện tại là:", muteSound.muted);

    if (muteSound.muted) {
        button.innerHTML = musicOn;
        muteSound.mute(false);
        console.log("Đã unmute. Trạng thái mới là:", muteSound.muted);
    } else {
        button.innerHTML = musicOff;
        muteSound.mute(true);
        console.log("Đã mute. Trạng thái mới là:", muteSound.muted);
    }
    // toggle the muted property of the audio element
    muteSound.muted = !muteSound.muted;
});

document.addEventListener('DOMContentLoaded', () => {
  const sound = document.getElementById("sound");
  const trigger = document.querySelector(".js-confetti");
  const helloLinh = document.getElementById('hello-linh');
  const banner = document.getElementById('banner');
  const start1 = document.getElementById('star1');
  const start2 = document.getElementById('star2');
  const start3 = document.getElementById('star3');
  const start4 = document.getElementById('star4');
  const giftdiv = document.getElementById('final-gifts');
  const msg2010 = document.getElementById('msg-20-10');
  const msgHope = document.getElementById('msg-hope');
  const msgGetFlower = document.getElementById('msg-get-flower');
  const loveYouMessage = document.getElementById('love-you');
  let flowerCount = 0; // Biến đếm số lần bấm nút

  // Ẩn nút khi vừa vào
  trigger.classList.add('hidden');

  // Hiển thị các thông điệp lần lượt khi vào trang
  setTimeout(() => {
    helloLinh.classList.remove('hidden');
    helloLinh.style.opacity = 1;
  }, 4000); // Hiển thị "Hello, Linh" sau 2 giây

  setTimeout(() => {
    helloLinh.style.opacity = 0;
    setTimeout(() => {
      helloLinh.classList.add('hidden');
      msg2010.classList.remove('hidden');
      msg2010.style.opacity = 1;
    }, 1000); // Đợi 1 giây trước khi ẩn "Hello, Linh"
  }, 8000); // Hiển thị "Ngày 20-10..." sau 4 giây (tổng cộng 6 giây)

  setTimeout(() => {
    msg2010.style.opacity = 0;
    setTimeout(() => {
      msg2010.classList.add('hidden');
      msgHope.classList.remove('hidden');
      msgHope.style.opacity = 1;
    }, 1000); // Đợi 1 giây trước khi ẩn "Ngày 20-10..."
  }, 12000); // Hiển thị "Hi vọng em không chê..." sau 8 giây (tổng cộng 14 giây)

  setTimeout(() => {
    msgHope.style.opacity = 0;
    setTimeout(() => {
      msgHope.classList.add('hidden');
      msgGetFlower.classList.remove('hidden');
      msgGetFlower.style.opacity = 1;
    }, 1000); // Đợi 1 giây trước khi ẩn "Hi vọng em không chê..."
  }, 22000); // Hiển thị "Nhấn để nhận hoa nhé!" sau 14 giây (tổng cộng 30 giây)

  setTimeout(() => {
    msgGetFlower.style.opacity = 0;
    setTimeout(() => {
      trigger.classList.remove('hidden');
      trigger.style.opacity = 1;
    }, 1000);
  }, 27000); // Ẩn "Nhấn để nhận hoa nhé!" sau 16 giây (tổng cộng 46 giây)

  const defaults = {
    disableForReducedMotion: true
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(200 * particleRatio)
      })
    );
  }

  function popEffect(gift) {
    // Phát âm thanh "pop"
    const popSound = new Audio('pop.mp3'); // Thay bằng đường dẫn đến âm thanh "pop"
    popSound.play();

    // Hiệu ứng tia liti
    const particleCount = 100; // Số lượng tia
    const centerX = gift.getBoundingClientRect().left + (gift.offsetWidth / 2);
    const centerY = gift.getBoundingClientRect().top + (gift.offsetHeight / 2);

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'absolute';
      particle.style.width = '5px';
      particle.style.height = '5px';
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'; // Màu sắc tia

      // Tính toán vị trí ngẫu nhiên cho tia
      const angle = Math.random() * 2 * Math.PI; // Góc ngẫu nhiên
      const radius = Math.random() * 100; // Bán kính ngẫu nhiên
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      document.body.appendChild(particle);

      // Tạo hoạt ảnh cho tia
      setTimeout(() => {
        particle.style.transition = 'transform 0.5s, opacity 0.5s';
        particle.style.transform = `translate(-50%, -50%) scale(0)`; // Biến tia thành 0
        particle.style.opacity = '0';
      }, 100); // Đợi một chút để tạo hiệu ứng "pop"

      // Xóa tia sau khi hoàn thành hiệu ứng
      setTimeout(() => {
        document.body.removeChild(particle);
      }, 1000);
    }
  }

  function confettiExplosion(origin) {
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      origin
    });
    fire(0.2, {
      spread: 60,
      origin
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      origin
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      origin
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      origin
    });
  }

  // Xử lý sự kiện bấm nút
  trigger.addEventListener("click", () => {
    flowerCount++; // Tăng biến đếm mỗi lần bấm

    // Thay đổi nội dung nút sau lần bấm đầu tiên
    if (flowerCount === 1) {
      trigger.textContent = "Nhấn lần nữa để nhận thêm hoa!!";
    }

    if (flowerCount > 1 && flowerCount < 6) {
      trigger.textContent = "Thêm lần nữa!! 🫵";
    }

    if (flowerCount <= 5) {
      const flower = document.getElementById(`flower${flowerCount + 5}`); // Lấy ID hoa tương ứng
      const rect = trigger.getBoundingClientRect();
      const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      const origin = {
        x: center.x / window.innerWidth,
        y: center.y / window.innerHeight
      };

      if (sound) {
        sound.currentTime = 0;
        sound.play();
      }
      confettiExplosion(origin);

      // Hiện hoa tương ứng
      flower.classList.remove('hidden');
      flower.style.opacity = 1;
    }

    // Nếu bấm lần thứ 6
    if (flowerCount === 6) {
      trigger.classList.add('hidden'); // Ẩn nút
      for (let i = 6; i <= 10; i++) {
        const currentFlower = document.getElementById(`flower${i}`);
        currentFlower.style.opacity = 0; // Ẩn tất cả hoa
      }

      trigger.style.opacity = 0;
      trigger.classList.add('hidden');

      banner.style.opacity = 0;
      banner.classList.add('hidden');

      start1.style.opacity = 0;
      start1.classList.add('hidden');

      start2.style.opacity = 0;
      start2.classList.add('hidden');

      start3.style.opacity = 0;
      start3.classList.add('hidden');

      start4.style.opacity = 0;
      start4.classList.add('hidden');

      // Đợi một chút trước khi bắt đầu hiện các thông điệp
      setTimeout(() => {
        // Hiện lần lượt các dòng chữ trong 4 giây
        let messageDelay = 0; // Độ trễ tổng cho thông điệp
        const messages = [
          document.getElementById('message'),
          document.getElementById('gift-message')
        ];

        messages.forEach((message, index) => {
          // Hiện thông điệp
          setTimeout(() => {
            message.classList.remove('hidden');
            message.style.opacity = 1;
          }, messageDelay);

          // Ẩn thông điệp sau 2 giây
          messageDelay += 4500; // 2 giây hiển thị + 0.5 giây chờ

          // Để ẩn thông điệp sau khi hiển thị
          setTimeout(() => {
            message.style.opacity = 0;
            setTimeout(() => {
              message.classList.add('hidden');
            }, 1000); // Ẩn thông điệp sau 1 giây
          }, messageDelay);

          messageDelay += 500; // Thêm độ trễ cho lần hiển thị tiếp theo
        });

        // Hiện giftdiv sau khi các thông điệp hiện xong
        setTimeout(() => {
          giftdiv.classList.remove('hidden');
          giftdiv.style.opacity = 1;

          // Hiện ảnh món quà lần lượt sau mỗi giây
          const images = giftdiv.querySelectorAll('img');
          images.forEach((image, index) => {
            setTimeout(() => {
              image.classList.remove('hidden');
              image.style.opacity = 1;

              // Thêm hiệu ứng "pop" khi hiển thị từng ảnh
              popEffect(image);
            }, index * 1000); // Hiện mỗi ảnh sau mỗi giây
          });

          // Ẩn tất cả các ảnh sau khi đã hiện hết
          setTimeout(() => {
            images.forEach((image, index) => {
              setTimeout(() => {
                image.style.opacity = 0;
                setTimeout(() => {
                  image.classList.add('hidden');
                }, 1000); // Ẩn từng ảnh sau 1 giây
              }, index * 1000); // Ẩn mỗi ảnh sau mỗi giây
            });

            // Hiển thị thông điệp "Love you!" sau khi các ảnh đã ẩn
            setTimeout(() => {
              loveYouMessage.classList.remove('hidden');
              loveYouMessage.style.opacity = 1;
            }, images.length * 1000 + 1000); // Ẩn ảnh xong thì hiện thông điệp
          }, images.length * 1000); // Đợi đến khi hiện xong tất cả ảnh
        }, messages.length * 5000 + 500); // Đợi thêm sau khi hiện các thông điệp
      }, 2000); // Đợi 2 giây trước khi bắt đầu hiện thông điệp
    }
  });
});

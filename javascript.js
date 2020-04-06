          let canvas = document.querySelector('canvas');
          let canvx = canvas.getContext('2d');

          canvx.width = 1000;
          canvx.height = 500;

          const cw = canvx.width;
          const ch = canvx.height;

          let lineX = 10;
          let lineY = 20;

          let licznik = 0;
          var pkt = document.getElementById('pkt');

          const rpilki = 20;

          let spilkiX = 495;
          let spilkiY = 250;

          let predkoscX = 4;
          let predkoscY = 4;

          let graczY = 200;
          let aiY = 200;

          let graczX = 50;
          let aiX = 930;

          let lx = 20;
          let ly = 100;

          topCanvas = canvas.offsetTop;
          console.log(topCanvas);


          function ruchgracza(e) {
            graczY = e.clientY - topCanvas;
            aiY = graczY;

            if(graczY >= ch - 50) {
              graczY = ch - 50;
              aiY = ch - 50;
            }
            if(graczY <= 0 + 50) {
              graczY = 50;
              aiY = 50;
            }
          }

          canvas.addEventListener("mousemove", ruchgracza);

          function speed() {
            console.log(predkoscX, predkoscY);
            //Predkosc X
            if(predkoscX > 0 && predkoscX < 16) {
              predkoscX += 1;
            }
            else if(predkoscX < 0 && predkoscX > -16) {
              predkoscX -= 1;
            }
            //Predkosc Y
            if(predkoscY > 0 && predkoscY < 16) {
              predkoscY += 1;
            }
            else if(predkoscY < 0 && predkoscY > -16) {
              predkoscY -= 1;
            }
          }

          function aiPosition() {


          }

          function gracz() {
            canvx.fillStyle = "rgb(68, 181, 156)";
            canvx.fillRect(graczX, graczY - 50, lx, ly);
          }

          function ai() {
            canvx.fillStyle = "rgb(84, 68, 181)";
            canvx.fillRect(aiX, aiY - 50, lx, ly);
          }

          function srodek() {
            for(let line = 0; line < ch; line += 40)
              {
              canvx.fillStyle = "white";
              canvx.fillRect(cw / 2 - 10, line, lineX, lineY);
              }
          }

          function boisko() {
              canvx.fillStyle = "rgb(30, 149, 26)";
              canvx.fillRect(0, 0, cw, ch);
          }

          function pilka() {
            var circle = new Path2D();
            canvx.fillStyle = "rgb(23, 23, 23)";
            // canvx.fillRect(spilkiX, spilkiY, rpilki, rpilki);
            circle.arc(spilkiX, spilkiY, rpilki, 0, 2 * Math.PI);
            canvx.fill(circle);
            spilkiX += predkoscX;
            spilkiY += predkoscY;

            if(spilkiY - rpilki <= 0 || spilkiY + rpilki >= ch)
            {
              predkoscY = -predkoscY;
            //  speed();
            }
            if(spilkiX - rpilki <= 0 || spilkiX + rpilki >= cw)
            {
              predkoscX = -predkoscX;
            //  speed();
            }
            if((spilkiX - rpilki <= graczX + lx) && (spilkiY + rpilki >= graczY) && (spilkiY + rpilki <= graczY + ly))
            {
              predkoscY = -predkoscY;
              predkoscX = -predkoscX;
              licznik++;
              console.log(licznik);
              pkt.innerHTML = licznik;
            }
          }



          function game() {
              boisko()
              srodek()
              pilka()
              gracz()
              ai()
              aiPosition()
          }

          setInterval(game, 1000 / 60);

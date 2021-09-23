import { Component, OnInit, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  colorarray: string[] = ["#552586", "#6a359c", "#804fb3", "#9969c7", "#b589d6"];
  count : number = 0;
  percent : number = 0;
  customcolor:string = ["hsl(",((1 - 0) * 5).toString(10) , ",60%,80%)"].join("");
  flag : boolean = false;
  clientX : number;
  clientY :number;
  displayX: string="0px";
  displayY: string = "0px";
  displayX2: string="0px";
  displayY2: string = "0px";
  displayY3: string = '0px';
  opaq: string = "100%";
  timer : any;
  score: number = 0;
  canClick = false;
  life1:boolean = true;
  life2: boolean = true;
  life3:boolean = true;
  missedClick : boolean = false;
  opaq2: string = "100%";
  timer2 : any;
  percent2 : number = 0;
  gameover: boolean = false;
  constructor(private renderer : Renderer2) { }

  ngOnInit(): void {
    this.changeColor();
    this.randomPopup();
  }
  randomPopup(){
    setTimeout(()=>{
      const minusone = document.getElementById('minusone');
      const popup = document.getElementById('popup');
      const plusone = document.getElementById('plusone');
      if(this.missedClick == true){
        
        // this.renderer.setStyle(minusone, 'visibility', 'visible');
        // var curdisplay2 = this.displayY2;
        // this.displayY3 = (Number(curdisplay2.replace('px',''))-75) + "px";
        if(this.life1){
          this.life1 = false;
        }
        else{
          if(this.life2){
            this.life2 = false;
          }
          else{
            if(this.life3){
              this.life3 = false;
              //const gameover = document.getElementById('gameover');
              const playagain = document.getElementById('playagain');
              //this.renderer.setStyle(gameover, 'visibility', 'visible');
              this.renderer.setStyle(playagain, 'visibility', 'visible');
            }
          }
        }
      }
if(this.life1 || this.life2 || this.life3){
//this.renderer.setStyle(minusone, 'visibility', 'hidden');
var randomY = Math.floor(Math.random() * (600-100)+100);
var randomX = Math.floor(Math.random() * (1200-100)+100);
this.displayY2 = "" + (randomY) + "px";
this.displayX2 = "" + (randomX) + "px";
this.canClick = true;
this.missedClick = true;
this.renderer.setStyle(plusone, 'visibility', 'hidden');
this.percent2 = 0;
this.renderer.setStyle(popup, 'visibility', 'visible');

this.randomPopup();
}
else{

  this.renderer.setStyle(popup, 'visibility', 'hidden');
  this.randomPopup();
  this.gameover = true;
}
    }, 3000*1/(Math.log(this.score+2)))
  }
  changeColor():void{
setTimeout(()=>{

    if(this.count>=45){
      this.flag = true;
    }
    this.customcolor = this.getColor(this.count)

    if(!this.flag){
      this.count+=1;
    }
    else{
      this.count-=1;
    }
    
    this.changeColor();
}, 1000)
  }
  getColor(value:any){
    //value from 0 to 1
    var hue = ((1 - value) * 5).toString(10);
    return ["hsl(", hue, ",60%,80%)"].join("");
  }
  mouseMoved(event: MouseEvent){
    this.clientX = event.clientX;
    this.clientY = event.clientY;

  }
  onClickPopup(){
    if(this.canClick){
    this.score+=1;
    this.canClick = false;
    this.missedClick = false;
    
    }
    if(this.missedClick == false){
      const click = document.getElementById('popup');
      const plusone = document.getElementById('plusone');
      this.renderer.setStyle(click, 'visibility', 'hidden');
      this.renderer.setStyle(plusone, 'visibility', 'visible');
  
    }


  }
  onClickPlayAgain(){
    //const gameover = document.getElementById('gameover');
    const playagain = document.getElementById('playagain');
    //this.renderer.setStyle(gameover, 'visibility', 'hidden');
    this.renderer.setStyle(playagain, 'visibility', 'hidden');
    this.life1 = true;
    this.life2 = true;
    this.life3 = true;
    this.score = 0;
    this.missedClick = false;
    this.gameover = false;

  }
  
  onClick(){

    const parent = document.getElementById("animation");
    // var curY = this.displayY2.replace('px','');
    // var curX = this.displayX2.replace('px','');
    // var staticX = this.clientX;
    // var staticY = this.clientY
    // if(staticY + 150 >= Number(curY) && staticY - 150 <= Number(curY)){
    //   if(staticX + 150 >= Number(curX) && staticX - 150 <= Number(curX)){
    //     console.log("Current Value:" + this.clientY, this.clientX);
    //     console.log("Displayed" + curY, curX);
    //     this.score+=1;
    //   }
    // }
    this.displayY = "" + (this.clientY-100) + "px";
    this.displayX = "" + (this.clientX) + "px";
    this.renderer.setStyle(parent, 'visibility', 'visible');
    this.percent = 0;
    this.changeOpaq();
    // this.renderer.setStyle(parent, 'height', `${this.clientX + 2}px`);
    // this.renderer.setStyle(parent, 'right', this.clientX);

  }


  changeOpaq(){

    this.timer = setInterval(()=>this.change(), 200);
    this.percent = 0;

}
change(){
  const parent = document.getElementById("animation");

  this.opaq = (100-this.percent*10) + "%";
  this.percent+=1;
  if(this.percent>10){
    clearInterval(this.timer);
    console.log(this.percent)

  }


}
changeOpaq2(){

  this.timer2 = setInterval(()=>this.change(), 200);
  this.percent2 = 0;

}
change2(){
const parent = document.getElementById("plusone");

this.opaq2 = (100-this.percent2*10) + "%";
this.percent2+=1;
console.log(this.opaq2);
if(this.percent2>10){
  clearInterval(this.timer2);

}
}

  goTo(url:string){
    window.open(url, "_blank")
  }
  
}



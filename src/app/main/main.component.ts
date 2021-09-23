import { Component, OnInit } from '@angular/core';
import Typewriter from 't-writer.js';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const target = document.querySelector(".text")
    const writer = new Typewriter(target, {
      loop: true,
      typeColor: 'white',
      typeSpeed: 100,
      deleteSpeed: 75,
      cursorColor:  'white'
    })
    
    writer
    .strings(1000,
      "Albert Lu",
      "a Developer",
      "an avid fan of tennis",
      "a student at Northwestern"
    )
      .start()

  }

}

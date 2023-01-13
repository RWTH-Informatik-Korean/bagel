import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isEnabled: boolean = false;
  content: string = '';
  modules = {};
    
  constructor( private route: ActivatedRoute ) { 
    this.modules = {
      syntax: true,
      'emoji-shortname': true,
      'emoji-textarea': true,
      'emoji-toolbar': true,
      'toolbar': [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        ['link', 'image', 'video'],                         // link and image, video
        ['emoji']
      ]
    }
  }
  addBindingCreated(quill: { keyboard: { addBinding: (arg0: { key: string; shiftKey?: boolean; }, arg1: { (range: any, context: any): void; (range: any, context: any): void; }) => void; }; }) {
    quill.keyboard.addBinding({
      key: 'b'
    }, (range: any, context: any) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING B', range, context)
    })

    quill.keyboard.addBinding({
      key: 'B',
      shiftKey: true
    }, (range: any, context: any) => {
      // tslint:disable-next-line:no-console
      console.log('KEYBINDING SHIFT + B', range, context)
    })
  }

  ngOnInit(): void {
  }
  
  selectCategory() {
    let categorySelect = (document.getElementById('selectCategory')) as HTMLSelectElement;
    let selected = categorySelect.selectedIndex;
    let selectedValue = categorySelect.options[selected];
    selectedValue.value==='community' ? this.isEnabled = true : this.isEnabled = false;
  }
}

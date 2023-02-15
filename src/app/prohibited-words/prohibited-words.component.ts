import { style } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-prohibited-words',
  templateUrl: './prohibited-words.component.html',
  styleUrls: ['./prohibited-words.component.scss']
})
export class ProhibitedWordsComponent {

  public addWord = '';
  public badWord = '';
  public isAddWord = false;
  public isBorder = true
  public checkBadWordsArea = '';
  public isTextareaBorder = false;
  public isTextareaPlaceholder = true;

  add() {
    this.badWord += this.addWord + ' '
    if (!this.addWord) {
      this.isAddWord = true
      this.isBorder = false
    } else {
      this.isAddWord = false
      this.isBorder = true
    }
    this.addWord = ''
  }
  reset() {
    this.addWord = ''
    this.badWord = ''
    this.checkBadWordsArea = ''
    this.isAddWord = false
    this.isBorder = true
    this.isTextareaPlaceholder = true
    this.isTextareaBorder = false
  }

  cenzor() {
    const replace = (len: string) => {
      return len.replace(len, `*`.repeat(len.length))
    }
    if (this.checkBadWordsArea.length == 0) {
      this.isTextareaPlaceholder = false
      this.isTextareaBorder = true
    } else {
      this.isTextareaBorder = false
      let checkTextareaWords = this.checkBadWordsArea.split(' ')
      let checkBadWordsSpan = this.badWord.split(' ')

      for (let i = 0; i < checkTextareaWords.length; i++) {
        for (let j = 0; j < checkBadWordsSpan.length; j++) {
          if (checkTextareaWords[i] == checkBadWordsSpan[j]) {
            let wordFromTextarea = this.checkBadWordsArea.split(' ')
            wordFromTextarea.forEach(w => {
              const newTextareaValue = (val: any) => {
                if (val !== checkBadWordsSpan[j]) {
                  return this.checkBadWordsArea
                } else {
                  if (this.checkBadWordsArea.includes(w)) {
                    let prohibWord = checkTextareaWords[i]
                    w = replace(checkTextareaWords[i])
                    this.checkBadWordsArea = this.checkBadWordsArea.replace(prohibWord, `*`.repeat(prohibWord.length))
                  }
                }
              }
              if (w == checkBadWordsSpan[j]) {
                newTextareaValue(w)
              }
            })
          }
        }
      }
    }
  }
}





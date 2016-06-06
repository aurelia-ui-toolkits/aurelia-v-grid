# Additional documentation
## how to do special things

And stuff ... like pretty code:

```javascript
import {inject} from 'aurelia-framework';
import {SpecialCases} from './my-special-cases';

@inject(SpecialCases)
export class SpecialThings {
  constructor(specialCases) {
    this._case = specialCases.getCase('special'); 
  }
}
```

Needs padding, maybe. :-)

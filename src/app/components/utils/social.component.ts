import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { icons } from 'src/icon';
import { ShareService } from '@ngx-share/core';

@Component({
  selector: 'app-social-share',
  template: `<share-buttons [theme]="'circles-dark'"
  [include]="['facebook','twitter','linkedin','google','whatsapp','reddit','tumblr','mix','vk','telegram','messenger','xing','line','sms','email','print','copy']"
  [show]="5"
  [showText]="true"
  [autoSetMeta]="false"
 ></share-buttons>`
})
export class SocialShareComponent {
  constructor(library: FaIconLibrary, public share: ShareService) {
    library.addIcons(...icons);
  }
}
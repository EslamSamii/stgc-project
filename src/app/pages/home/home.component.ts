import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('inView', style({ clipPath: 'polygon(-10% 0%, 110% 0%, 110% 110%, -10% 110%)', transform: 'translateY(0)' })),
      state('outOfView', style({ clipPath: 'polygon(-10% -100%, 110% -100%, 110% 0%, -10% 0%)', transform: 'translateY(20px)' })),
      transition('outOfView => inView', [
        animate(
          '0.5s {{ delay }}s cubic-bezier(0.215, 0.61, 0.355, 1)',
          keyframes([
            style({ clipPath: 'polygon(-10% -100%, 110% -100%, 110% 0%, -10% 0%)', offset: 0 }),
            style({ clipPath: 'polygon(-10% 0%, 110% 0%, 110% 110%, -10% 110%)', offset: 1 })
          ])
        )
      ],{ params: { delay: 0.4 } }),
      transition('inView => outOfView', [
        animate(
          '0.5s {{ delay }}s cubic-bezier(0.215, 0.61, 0.355, 1)',
          keyframes([
            style({ clipPath: 'polygon(-10% 0%, 110% 0%, 110% 110%, -10% 110%)', offset: 0 }),
            style({ clipPath: 'polygon(-10% -100%, 110% -100%, 110% 0%, -10% 0%)', offset: 1 })
          ])
        )
      ], { params: { delay: 0 } })
    ]),
    trigger('slideUp', [
      state('inView', style({ transform: 'translateY(0)', opacity:1 })),
      state('outOfView', style({ transform: 'translateY(100)', opacity:0 })),
      transition('outOfView => inView', [
        animate(
          '0.7s {{ delay }}s cubic-bezier(0.215, 0.61, 0.355, 1)',
          keyframes([
            style({ transform: 'translateY(100vh)', opacity:0, offset: 0 }),
            style({ transform: 'translateY(0vh)', opacity:1, offset: 1 }),
          ])
        )
      ],{ params: { delay: 0.5 } }),
      transition('inView => outOfView', [
        animate(
          '0.5s {{ delay }}s cubic-bezier(0.215, 0.61, 0.355, 1)',
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0, offset: 1}),
          ])
        )
      ], { params: { delay: 0 } })
    ]),

  ]
})
export class HomeComponent implements OnInit {


  public bgImages: {src: string, isSelected: boolean}[] = [
    {
      src: 'assets/images/bg-1.jpg',
      isSelected: true
    },
    {
      src: 'assets/images/bg-1.jpg',
      isSelected: false
    },
    {
      src: 'assets/images/image-1.jpg',
      isSelected: false
    },
    {
      src: 'assets/images/image-2.jpg',
      isSelected: false
    }
  ]

  public cards: {image: string, name: string, desc: string}[] = [
    {
      image: 'assets/images/group1.jpg',
      name:'MSMEs',
      desc:'Empowering Small Businesses for Sustainable Growth – Micro, Small, and Medium Enterprises are vital for innovation and local economic development in sustainable tourism'
    },
    {
      image: 'assets/images/group2.jpg',
      name:'Large Companies',
      desc:'Driving Corporate Responsibility in Tourism – Encouraging large corporations to lead by example through sustainable operations and supply chains.'
    },
    {
      image: 'assets/images/group3.jpg',
      name:'Destinations',
      desc:'Promoting Eco-friendly Tourism Hotspots – Destinations play a key role in implementing sustainable practices to minimize environmental impacts.'
    },
    {
      image: 'assets/images/group4.jpg',
      name:'Travelers & Youth',
      desc:'Engaging the Future of Tourism – Involving travelers, especially younger generations, in shaping eco-conscious behaviors and preferences.'
    },
    {
      image: 'assets/images/group5.jpg',
      name:'Mobility',
      desc:'Advancing Sustainable Transportation Solutions – Ensuring that transportation options reduce carbon footprints and enhance travel efficiency.'
    },
  ]

  public readonly areasCards: {image: string, label: string, desc: { title:string, content: string, count: number }[]}[] = [
    {
      image: 'assets/images/area1.jpg',
      label: 'Climate',
      desc: [
        {
          count: 1,
          title: 'Circular Carbon Economy approaches',
          content: 'Supporting innovations in carbon capture and utilization, encouraging the development of renewable energy solutions, and advocating for policies that facilitate the reduction, reuse, recycling, and removal of carbon, driving sustainable travel and tourism growth while mitigating climate change.'
        }
      ]
    },
    {
      image: 'assets/images/area2.jpg',
      label: 'Nature',
      desc: [
        {
          count: 3,
          title: 'Resource efficiency',
          content: 'Promoting sustainable practices that minimize waste and optimize the use of energy, water, and materials by supporting innovative solutions that enhance operational efficiency, reduce environmental impact, and contribute to a more sustainable global economy.'
        },
        {
          count: 2,
          title: 'Ecosystem Conservation, Nature-Based, and Regenerative Solutions',
          content: 'Advancing nature-based and regenerative solutions globally by supporting initiatives that protect ecosystems, promote eco-friendly tourism practices, and enhance biodiversity, ensuring tourism contributes to environmental preservation and local community well-being.'
        },
      ]
    },
    {
      image: 'assets/images/area3.jpg',
      label: 'Communities',
      desc: [
        {
          count: 5,
          title: 'Preserving cultural heritage and boosting sustainable livelihoods',
          content: 'Promoting initiatives that protect traditional practices and local knowledge by supporting community-based projects that enhance cultural tourism, foster heritage and artisanal crafts, and integrate sustainable practices, ensuring that cultural assets contribute to economic development and community well-being.'
        },
        {
          count: 4,
          title: 'Enabling community-based innovation and digitalization',
          content: 'Empowering local communities to develop solutions that address their unique challenges by promoting digital tools and supporting collaborations and initiatives that drive sustainable growth technological advancement at the grassroots level worldwide.'
        },
      ]
    },
    {
      image: 'assets/images/area4.jpg',
      label: 'Transversal',
      desc: [
        {
          count: 8,
          title: 'Building Tourism Resilience',
          content: 'Developing strategies that enhance the ability of destinations to withstand the range of challenges faced. We do this by supporting adaptive management practices, encouraging diversification of tourism offerings, and fostering collaboration among stakeholders, ensuring that tourism sectors remain robust and sustainable for the future.'
        },
        {
          count: 7,
          title: 'Sustainable procurement and Consumer Awareness',
          content: 'Promoting initiatives that encourage ethical supply chains and raising awareness about the environmental and social impacts of purchasing decisions, empowering youth and travelers and the tourism industry to make informed choices for a sustainable future.'
        },
        {
          count: 6,
          title: 'Sustainable Destination Management and Governance',
          content: 'Promoting frameworks for responsible tourism and environmental stewardship that focus on and engage the needs of local communities, enhance stakeholder collaboration, and ensure sustainable resource management, allowing tourist destinations to thrive economically while preserving cultural and natural heritage.'
        },
      ]
    }
  ]
  public isExpanding: boolean = false;
  public displaySecondSection: boolean = false;
  public expandCards: boolean = false;
  public contactForm: FormGroup = new FormGroup({
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  })
  private _destroy$: Subject<void> = new Subject<void>();
  public isScrolledToConfirmationButton: boolean = false;
  @ViewChild('stakeholderGroupsRef') stakeholderGroupsRef!: ElementRef;
  @ViewChild('contactFormRef') contactFormRef!: ElementRef;
  @ViewChild('headerContentOne') headerContentOne!: ElementRef;
  @ViewChild('headerContentTwo') headerContentTwo!: ElementRef;
  @ViewChild('confirmationButtonRef') confirmationButtonRef!: ElementRef;
  @ViewChild('ares') aresRef!: ElementRef;
  @ViewChildren('imagesRef') imagesRef!: QueryList<ElementRef>;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('sponsorsContainer') sponsorsContainer!: ElementRef;
  public hideScrollButton: boolean = false;
  private _isLoadingPage = true;
  public isScrolledToConfirmationButtonGroup: boolean = false;
  public logosNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];

  constructor( private _AppService: AppService, private _ChangeDetectorRef: ChangeDetectorRef) {}

  public get currentSection(): number{
    return this._isLoadingPage ? 0 : Math.round(scrollY / innerHeight);
  }

  public get isSmallScreenView(): boolean{
    return innerWidth <= 992;
  }

  ngAfterViewInit(): void {
    this._areaSectionPositioning();
    this._isLoadingPage=false;
    this.videoPlayer.nativeElement.muted = true;
    this.videoPlayer.nativeElement.playbackRate = 2;
  }

  ngOnInit() {
    scrollTo({left:0, top:0});
    this.hideScrollButton =false;
    this.displaySecondSection =  this.isSmallScreenView ? this.currentSection >= 2 && this.currentSection < 3 : this.currentSection >= 2 && this.currentSection <= 3;
    this.expandCards = window.innerWidth > 1920;
    if(this.isSmallScreenView) this.bgImages.pop();
    this._AppService.onScrollChange$.pipe(
      tap(()=>{
        this.isScrolledToConfirmationButtonGroup = this.sponsorsContainer.nativeElement.getBoundingClientRect().top < 0 && this.sponsorsContainer.nativeElement.querySelector('.logos-container').getBoundingClientRect().width- innerWidth + this.sponsorsContainer.nativeElement.getBoundingClientRect().top > 0 ;
        this.hideScrollButton = true;
        let percentage = (window.scrollY / (innerHeight * 3));
        if(percentage > 1) percentage = 1;
        // Handle scaling
        const minScale = 1.2;
        const maxScale = 1;
        const scale = maxScale - ((percentage) * (maxScale - minScale));
        this.imagesRef.forEach(imageRef=> imageRef.nativeElement.style.transform = `scale(${scale})`)
        if(this.confirmationButtonRef.nativeElement.getBoundingClientRect().top - innerHeight < 0)
          this.isScrolledToConfirmationButton = true;
        this.expandCards = this.stakeholderGroupsRef.nativeElement.getBoundingClientRect().top - (innerHeight/2) <0
        this._AppService.handleFillingText(
          this.headerContentTwo.nativeElement,
          120,100
        );
        this.displaySecondSection =  this.isSmallScreenView ? this.currentSection >= 2 && this.currentSection < 3 : this.currentSection >= 2 && this.currentSection <= 3
        this._areaSectionPositioning();
      }
      ),
      takeUntil(this._destroy$),
      debounceTime(5)
    ).subscribe({
      next: ()=>{
        for(let [index, image] of Object.entries(this.bgImages)){
          image.isSelected = this.currentSection > 2 ? true : this.currentSection === +index;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _areaSectionPositioning(): void{
    if(this.isSmallScreenView || this._isLoadingPage) return;
    const elements = Object.entries(this.aresRef.nativeElement.querySelectorAll('.card'));
    if(this.aresRef.nativeElement.getBoundingClientRect().top < 0 && this.aresRef.nativeElement.getBoundingClientRect().top > -(this.aresRef.nativeElement.getBoundingClientRect().height - innerHeight)){
      this.aresRef.nativeElement.querySelector('.area-container').style.position = 'fixed';
      for(let [key,card] of elements){
        const element = card as HTMLElement;
        if(this.aresRef.nativeElement.getBoundingClientRect().top > (element.getBoundingClientRect().height + 25) * (+key * -1) ){
          element.classList.remove('hide')
          const top = parseFloat(element.style.top);
          const maxTop = 26 * +key ;
          const newTop = top < maxTop ? maxTop : ( (+key * (element.getBoundingClientRect().height + 50)) + this.aresRef.nativeElement.getBoundingClientRect().top)
          element.style.top =newTop + 'px';
          const prevElement = elements[+key-1]?.[1] as HTMLElement;
          const nextElement = elements[+key+1]?.[1] as HTMLElement;
          if(prevElement && +key >0){
            prevElement.style.top = (26 * (+key-1)) + 'px';
            prevElement.classList.add('hide')
          }
          if(nextElement){
            const nextTop = +key+1 === 3 ? newTop + (((+key-1) * 26) + 386 + 25) : newTop + (((+key-1) * 26) + 386 + 50)
            nextElement.style.top = nextTop+ 'px';
          }
          break;
        }
      }
    } else if(this.aresRef.nativeElement.getBoundingClientRect().top < -(this.aresRef.nativeElement.getBoundingClientRect().height - innerHeight)){
      (elements[3][1] as HTMLElement).style.top = (26 * 3) + 'px';
      this.aresRef.nativeElement.querySelector('.cards').style.minHeight = '100vh';
      this.aresRef.nativeElement.style.justifyContent = 'end';
      this.aresRef.nativeElement.querySelector('.area-container').style.position = 'static'
    }else{
      (elements[0][1] as HTMLElement).classList.remove('hide')
      this.aresRef.nativeElement.querySelector('.cards').style.minHeight = '';
      this.aresRef.nativeElement.style.justifyContent = '';
      this.aresRef.nativeElement.querySelector('.area-container').style.position = 'static'
    }
  }

  public getFormControl(controlName: string): FormControl{
    return this.contactForm.get(controlName) as FormControl;
  }
  expandCardsFun(){
    this.expandCards = true;
    this.stakeholderGroupsRef.nativeElement.scrollTo({left: 700, behavior: 'smooth'})
  }
}

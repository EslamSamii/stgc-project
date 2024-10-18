import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { AppService } from 'src/app/shared/sevices/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
      desc:'Empowering Small Businesses for Sustainable Growth – Micro, Small, and Medium Enterprises are vital for innovation and local economic development in sustainable tourism'
    },
    {
      image: 'assets/images/group3.jpg',
      name:'Destinations',
      desc:'Empowering Small Businesses for Sustainable Growth – Micro, Small, and Medium Enterprises are vital for innovation and local economic development in sustainable tourism'
    },
    {
      image: 'assets/images/group4.jpg',
      name:'Travelers & Youth',
      desc:'Empowering Small Businesses for Sustainable Growth – Micro, Small, and Medium Enterprises are vital for innovation and local economic development in sustainable tourism'
    },
    {
      image: 'assets/images/group5.jpg',
      name:'Mobility',
      desc:'Empowering Small Businesses for Sustainable Growth – Micro, Small, and Medium Enterprises are vital for innovation and local economic development in sustainable tourism'
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

  @ViewChild('stakeholderGroupsRef') stakeholderGroupsRef!: ElementRef;

  constructor( private _AppService: AppService) {}

  public get currentSection(): number{
    return Math.round(window.scrollY / window.innerHeight);
  }

  public get isSmallScreenView(): boolean{
    return window.innerWidth <= 992;
  }

  ngOnInit() {
    this.displaySecondSection =  this.isSmallScreenView ? this.currentSection >= 2 && this.currentSection < 3 : this.currentSection >= 2 && this.currentSection <= 3;
    this.expandCards = window.innerWidth > 1920;
    if(this.isSmallScreenView) this.bgImages.pop();
    this._AppService.onScrollChange$.pipe(
      tap(()=>{
        this.displaySecondSection =  this.isSmallScreenView ? this.currentSection >= 2 && this.currentSection < 3 : this.currentSection >= 2 && this.currentSection <= 3
      }
      ),
      takeUntil(this._destroy$),
      debounceTime(50)
    ).subscribe({
      next: ()=>{
        if(this.currentSection === 3 && this.isSmallScreenView){
          setTimeout(() => {
            if(this.isExpanding) return;
            this.stakeholderGroupsRef.nativeElement?.scrollTo({left: 550, behavior: 'smooth'});
          }, 500);
        }
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

  public onCardsScroll(event: Event): void{
    this.isExpanding = true;
    const flag = (event.target as HTMLElement)?.scrollLeft > 20;
    const expand = !this.expandCards && flag;
    this.expandCards = flag;
    if(expand) (event.target as HTMLElement)?.scrollTo({left: 550, behavior: 'smooth'});
    setTimeout(() => {
      this.isExpanding = false;
    }, 1000);
  }

  public getFormControl(controlName: string): FormControl{
    return this.contactForm.get(controlName) as FormControl;
  }

  // TODO
  public submit(): void{}
}

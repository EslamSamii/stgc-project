import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements AfterViewInit {

  public isSectionsFixed: boolean = true;
  @ViewChild('scrollHorizontallyRef') scrollHorizontallyRef!: ElementRef;
  @ViewChild('container') containerRef!: ElementRef;
  @ViewChild('scaledImageOne') scaledImageOne!: ElementRef;
  @ViewChild('scaledImageTwo') scaledImageTwo!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this._handleScroll();
  }

  public readonly cardsList: {type: '' | 'card' | 'img', title?: string, caption?: string, img?: string}[] = [
    {
      type: 'card',
      title: 'Galvanize and Corral',
      caption: 'Leading and accelerating the travel and tourism industry’s transition to a fully sustainable future',
    },
    {
      type:'',
    },
    {
      type: 'card',
      title: 'Establish a Research Hub',
      caption: 'Supply stakeholders with localized, evidence-based research, tools, training, policy papers and resources through global research partners, all in one platform to enhance sustainability efforts.',
    },
    {
      type:'',
    },
    {
      type:'',
    },
    {
      type: 'card',
      title: 'Drive SDGs in Tourism',
      caption: 'Advancing our global climate agenda and the achievement of our sustainable development goals through the Travel and Tourism eco-system.',
    },
    {
      type:'',
    },
    {
      type: 'img',
      img: 'assets/images/desc-img1.jpg'
    },
    {
      type: 'card',
      title: 'Ensure Impactful Engagement',
      caption: 'Measuring the potential and outcomes of every initiative and every research project, through bottom-up stakeholder engagement and quality-driven impact methodologies.',
    },
    {
      type:'',
    },
    {
      type: 'card',
      title: 'Set Sustainable Priorities',
      caption: 'Boosting and stimulating new priorities and targets to measure sustainable advancement of their destination.',
    },
    {
      type:'',
    },
    {
      type:'',
    },
    {
      type: 'card',
      title: 'Build Resilient Communities',
      caption: 'Boosting the understanding of the full benefits of investment to build their local economy, business and tourist communities.',
    },
    {
      type:'',
    },
    {
      type: 'card',
      title: 'Increase Youth Involvement',
      caption: 'to create a global network of STGC Youth Climate Champions, and navigating professional opportunities, training and networks with leading Climate mentors.',
    },
    {
      type: 'img',
      img: 'assets/images/desc-img2.jpg'
    },
    {
      type:'',
    },
    {
      type: 'card',
      title: 'Empower Stakeholders',
      caption: 'Serving stakeholders and their local and business communities to become sustainability leaders in their own right, and support access to sustainable finance sustainable education, global citizenship, local culture, responsible consumption, environmental goals, and promoting inter-governmental sharing of best practices.',
    },
  ]

  public get isMediumScreenView(): boolean{
    return window.innerWidth < 1440 && window.innerWidth > 1100;
  }
  public get isSmallScreenView(): boolean{
    return window.innerWidth < 1100;
  }

  private _handleScroll(skip: boolean = false): void {
    let percentage = (window.scrollY / (this.containerWidth-innerHeight));
    if(percentage > 1) percentage = 1;
    // Handle scaling
    const minScale = 1;
    const maxScale = 1.5;
    const scale = maxScale - ((percentage) * (maxScale - minScale));
    this.scaledImageOne.nativeElement.style.transform = `scale(${scale})`;
    this.scaledImageTwo.nativeElement.style.transform = `scale(${scale})`;
    if(percentage >= 1)
      this.isSectionsFixed = false;
    else this.isSectionsFixed = true;
    if(this.isSectionsFixed || skip)
      this.scrollHorizontallyRef.nativeElement.style.transform = `translate3d(-${percentage * (this.containerWidth- innerWidth)}px, 0px, 0px)`;
  }

  public get containerWidth(){
    return (this.containerRef?.nativeElement?.getBoundingClientRect()?.width) || 0;
  }

  ngOnInit(): void {
    scrollTo({left:0, top:0})
  }

  ngAfterViewInit(): void {
    document.querySelector('nav')?.classList.add('custom-nav')
    setTimeout(() => this._handleScroll(true));
  }

  ngOnDestroy(): void {
    document.querySelector('nav')?.classList.remove('custom-nav')
  }

}

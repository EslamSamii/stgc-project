import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from 'src/app/shared/services/app.service';

type Publication ={ file: string,image: string, name: string, desc: string}

@Component({
  selector: 'app-partnership',
  templateUrl: './partnership.component.html',
  styleUrls: ['./partnership.component.scss']
})
export class PartnershipComponent {

  public readonly cards: Publication[] = [
    {
      image: 'assets/images/publication1.jpg',
      name: 'THE EVOLUTION OF AIRPORTS - A Flight Path to 2050',
      desc: 'Report outlining trends for travel facing airports and ways airport leaders and governments can pave the way to tackle travel/mobility and sustainability.',
      file: 'assets/reports/1 THE EVOLUTION OF AIRPORTS - A Flight Path to 2050.pdf'
    },
    {
      name: 'THE BUSINESS CASE FOR CLIMATE ACTION IN TOURISM - REDUCING GHG EMISSIONS & WATER FOOTPRINT THROUGH FOOD CHOICES 2023',
      desc: 'Toolkit for SME hotels, caterers and restaurants to reduce food emissions & water footprint.',
      image: 'assets/images/publication2.jpg',
      file: 'assets/reports/2 THE BUSINESS CASE FOR CLIMATE ACTION IN TOURISM - REDUCING GHG EMISSIONS & WATER FOOTPRINT THROUGH FOOD CHOICES 2023.pdf'
    },
    {
      name: 'THE SOCIAL IMPACT OF GLOBAL TOURISM 2023',
      desc: 'Top-down Social Impact report assessing the T&T sector across 185 countries focusing on women, youth and high-wage jobs through-out economies.',
      image: 'assets/images/publication3.jpg',
      file: 'assets/reports/3 THE SOCIAL IMPACT OF GLOBAL TOURISM 2023.pdf'
    },
    {
      name: 'THE ENVIRONMENTAL IMPACT OF GLOBAL TOURISM 2023',
      desc: 'Top-down Environmental Impact report assessing the T&T sector across 185 countries focusing on GHGs, energy, water, air pollutants, raw material extraction.',
      image: 'assets/images/publication4.jpg',
      file: 'assets/reports/4 THE ENVIRONMENTAL IMPACT OF GLOBAL TOURISM 2023.pdf'
    },
    {
      name: 'THE BUSINESS CASE FOR SUSTAINABILITY IN TOURISM - THE VALUE OF SOLAR POWER GENERATION 2023',
      desc: 'Toolkits for hotels for sustainability - focus on off-grid solar energy benefits.',
      image: 'assets/images/publication5.jpg',
      file: 'assets/reports/5 THE BUSINESS CASE FOR SUSTAINABILITY IN TOURISM - THE VALUE OF SOLAR POWER GENERATION 2023.pdf'
    },
    {
      name: 'TPCC FOUNDATION FRAMEWORK 2022',
      desc: 'Framework Assessment for Stocktake covering 60 University researchers on science-based assessment of progress and gaps in tourism climate actions.',
      image: 'assets/images/publication6.jpg',
      file: 'assets/reports/6 TPCC FOUNDATION FRAMEWORK 2022.pdf'
    },
    {
      name: 'THE BUSINESS CASE FOR CLIMATE ACTION IN TOURISM - REDUCING GHG EMISSIONS & COST THROUGH SOLAR THERMAL HEATERS 2023',
      desc: 'Toolkit for SME hotels across various geographies focusing on economic and social benefits of solar thermal heaters.',
      image: 'assets/images/publication7.jpg',
      file: 'assets/reports/7 THE BUSINESS CASE FOR CLIMATE ACTION IN TOURISM - REDUCING GHG EMISSIONS & COST THROUGH SOLAR THERMAL HEATERS 2023.pdf'
    },
    {
      name: 'BEST PRACTICES FOR LOCAL SOURCING IN DESTINATIONS',
      desc: 'Toolkit for hospitality SMEs on business case for sustainability, focus on off-grid.',
      image: 'assets/images/publication8.jpg',
      file: 'assets/reports/8 BEST PRACTICES FOR LOCAL SOURCING IN DESTINATIONS.pdf'
    },
    {
      name: 'BETTER TRAVEL & TOURISM, BETTER WORLD 2022',
      desc: 'Strategic sustainability roadmap on sustainable tourism. Joint analysis and report assisting to create the STGC strategy and intervention areas.',
      image: 'assets/images/publication9.jpg',
      file: 'assets/reports/9 BETTER TRAVEL & TOURISM, BETTER WORLD 2022.pdf'
    }
  ]
  public selectedPublication?: Publication;
  public logosNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
  public isScrolledToRightEnd: boolean = false;
  public isScrolledToLeftEnd: boolean = true;
  public isScrolledToRightEnd2: boolean = false;
  public isScrolledToLeftEnd2: boolean = true;
  public downloadFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    organization: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
  })
  public isDownloadModalOpened: boolean = false;
  public isScrolledToConfirmationButton: boolean = false;
  public hideFloatingIcon: boolean = true;
  public isScrolledToConfirmationButton1: boolean = false;
  public isScrolledToConfirmationButtonGroup: boolean = false;
  @ViewChild('confirmationButtonRef') confirmationButtonRef!: ElementRef;
  @ViewChild('header') header!: ElementRef;
  @ViewChild('picOne') picOne!: ElementRef;
  @ViewChild('picTwo') picTwo!: ElementRef;
  @ViewChild('picThree') picThree!: ElementRef;
  @ViewChild('scrollHorizontallyRef') scrollHorizontallyRef!: ElementRef;
  @ViewChild('containerRef') containerRef!: ElementRef;
  @ViewChild('downloadFormGroupRef') downloadFormGroupRef!: ElementRef;
  @ViewChild('confirmationButtonRef1') confirmationButtonRef1!: ElementRef;
  @ViewChild('contactUsForm') contactUsForm!: ElementRef;
  @ViewChild('sponsorsContainer') sponsorsContainer!: ElementRef;
  private _destroy$: Subject<void> = new Subject<void>();
  public contactForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });
  @ViewChild('contactFormRef') contactFormRef!: ElementRef;
  public isSaving: boolean = false;

  constructor(private _AppService: AppService, private _ActivatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this._AppService.onNavColorChange$.next({color: 'white'});
    this._AppService.onScrollChange$.pipe(takeUntil(this._destroy$)).subscribe({
      next: ()=> this._handleScroll()
    })
    if(this._ActivatedRoute.snapshot.fragment)
      setTimeout(() => {
          this.navigateToFormSection();
      },1000);
    else
      scrollTo({top:0, left:0})
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public submitContactForm(): void{
    if(this.contactForm.invalid || this.isSaving){
      this.contactForm.markAllAsTouched();
      this.contactFormRef.nativeElement.reportValidity();
      return;
    }
    this.isSaving = true;
    this._AppService.contactUs(this.contactForm.value).subscribe({
      next: ()=>{
        this.isSaving = false;
        this._AppService.toaster$.next({message:`Thank you ${this.getFromControlContactForm('name').value} for showing your interest, Our team will be in contact with you`, success: true})
        this.contactForm.reset();
      },
      error: (error)=>{
        this.isSaving = false;
        console.log(error)
      }
    })
  }

  public get isMediumScreen(){
    return window.innerWidth > 992 && innerWidth < 1440;
  }

  public get isSmallScreenView(): boolean{
    return window.innerWidth <= 992;
  }

  private _handleScroll(): void {
    if(scrollY > 0)
      this._AppService.onNavColorChange$.next({color:'black'});
    else
      this._AppService.onNavColorChange$.next({color: 'white'});
    setTimeout(() => {
      const viewportHeight = window.visualViewport ? window.visualViewport.height : innerHeight;
      this.hideFloatingIcon = this.contactUsForm.nativeElement.getBoundingClientRect().top - viewportHeight < 0 || scrollY < 400;
    }, 500);
      if(this.confirmationButtonRef.nativeElement.getBoundingClientRect().top - innerHeight < 0)
      this.isScrolledToConfirmationButton = true;
    this.isScrolledToConfirmationButtonGroup = this.sponsorsContainer.nativeElement.getBoundingClientRect().top < 0 && this.sponsorsContainer.nativeElement.querySelector('.logos-container').getBoundingClientRect().width- innerWidth + this.sponsorsContainer.nativeElement.getBoundingClientRect().top > 0 ;
    let percentage = (window.scrollY / (this.header.nativeElement.getBoundingClientRect().height));
    const minTransition = this.isSmallScreenView ? 250 : this.isMediumScreen ? 350 : 300;
    const maxTransition = this.isSmallScreenView ? 550 : this.isMediumScreen ? 650 : 607;
    const transition = maxTransition - ((percentage) * (maxTransition - minTransition));
    this.picOne.nativeElement.style.top = `${transition}px`;
    this.picTwo.nativeElement.style.top = `${transition}px`;
    this.picThree.nativeElement.style.top = `${transition}px`;
    const minLeft = this.isMediumScreen ? 63 : this.isSmallScreenView ? 73 : 33;
    const maxLeft = this.isMediumScreen ? 80 : this.isSmallScreenView ? 90 : 60;
  }

  public toggleDownloadModal(card?: Publication){
    this.selectedPublication = card;
    this.isDownloadModalOpened = !this.isDownloadModalOpened;
  }

  public getFromControl(controlName: string): FormControl{
    return this.downloadFormGroup.get(controlName) as FormControl;
  }

  public getFromControlContactForm(controlName: string): FormControl{
    return this.contactForm.get(controlName) as FormControl;
  }

  public submit(): void{
    if(this.downloadFormGroup.invalid || this.isSaving){
      this.downloadFormGroup.markAllAsTouched();
      this.downloadFormGroupRef.nativeElement.reportValidity();
      return;
    }
    this.isSaving = true;
    this._AppService.downloadPublicationData(this.downloadFormGroup.value).subscribe({
      next: ()=>{
        this.isSaving = false;
        this.isDownloadModalOpened =false;
        this._AppService.toaster$.next({message:`Thank you ${this.getFromControl('name').value} for showing your interest`, success: true});
        this._saveFile(this.selectedPublication?.file)
        this.downloadFormGroup.reset();
      },
      error: (error)=>{
        this.isSaving = false;
        console.log(error)
      }
    })
  }

  private _saveFile(fileURL?: string): void {
    if (!fileURL) return;
    const link = document.createElement("a");
    link.download = fileURL.split('/').pop() || '';
    link.href =fileURL;
    link.click();
  }

  public navigateToFormSection(){
    const yPosition = this.contactUsForm.nativeElement.getBoundingClientRect().top + innerHeight +scrollY;
    window.scrollTo({
      top: yPosition,
      behavior: 'smooth'
    });
  }

  public navigateToTop(){

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollLeft(element: HTMLElement, type: 0 | 1){
    if(type===0)
      this.isScrolledToRightEnd = false
    if(type===1)
      this.isScrolledToRightEnd2 = false
    let left =element.scrollLeft - 450
    element.scrollTo({left: left, behavior: 'smooth'})
    if(left < 0) left = 0;
    setTimeout(() => {
      if(type===0)
        this.isScrolledToLeftEnd = element.scrollLeft === 0;
    if(type===1)
      this.isScrolledToLeftEnd2 = element.scrollLeft === 0
    }, 500)
  }

  scrollRight(element: HTMLElement, type: 0 | 1){
    if(type===0)
      this.isScrolledToLeftEnd = false
    if(type===1)
      this.isScrolledToLeftEnd2 = false
    let left =element.scrollLeft + 450;
    if(left > element.scrollWidth - innerWidth) left = element.scrollWidth - innerWidth;
    element.scrollTo({left: left, behavior: 'smooth'})
    setTimeout(() => {
      if(type===0)
        this.isScrolledToRightEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth -30;
    if(type===1)
      this.isScrolledToRightEnd2 = element.scrollLeft + element.clientWidth >= element.scrollWidth -30;
  }, 500);
  }
  public getImageSrc(url: string): string | undefined {
    const cachedImage = this._AppService.getImage(url);
    return cachedImage ? cachedImage.src : undefined;
  }
}

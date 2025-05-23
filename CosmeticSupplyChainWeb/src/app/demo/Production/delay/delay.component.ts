import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProdutionService } from 'src/app/services/prodution.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.scss']
})
export class DelayComponent implements OnInit {


   delayForm!: FormGroup;
  submitted = false;
  errorMessage: string = '';
  showResult = false;
  label: string = '';
  prediction: number = 0;


  categories: string[] = ['Autre', 'Soins', 'Maquillage', 'Cheveux','Parfums','Hygiène'];
  brands: string[] = [
  'Murad',
  'MATTER OF FACT',
  'The Nue Co.',
  'MACRENE actives',
  'DedCool',
  'Saint Jane',
  'PATTERN by Tracee Ellis Ross',
  'Stripes',
  'Bumble and bumble',
  'Paula\'s Choice',
  'FaceGym',
  'Viori',
  'Buxom',
  'St. Tropez',
  'Benefit Cosmetics',
  'SIMIHAZE BEAUTY',
  'Montblanc',
  'Sephora Favorites',
  'Gisou',
  'KORA Organics',
  'Salt & Stone',
  'Moroccanoil',
  'iNNBEAUTY PROJECT',
  'TAN-LUXE',
  'LYS Beauty',
  'Sarah Creal',
  'Kérastase',
  'CLINIQUE',
  'Therabody',
  'Chunks',
  'Ami Colé',
  'Vegamour',
  'Tower 28 Beauty',
  'DOMINIQUE COSMETICS',
  'Fara Homidi',
  'Azzaro',
  'BondiBoost',
  'superzero',
  'Naturally Serious',
  'Crown Affair',
  'Too Faced',
  'Mane',
  'Beautyblender',
  'AAVRANI',
  'Kulfi',
  'L\'Oréal Professionnel Steampod',
  'LAWLESS',
  'MAKE UP FOR EVER',
  'NEST New York',
  'DUO',
  'FOREO',
  'House of Lashes',
  'Then I Met You',
  'Hello Sunday',
  'Herbivore',
  'Urban Decay',
  'goop',
  'Kaja',
  'Skinfix',
  'Estée Lauder',
  'ABBOTT',
  'TWEEZERMAN',
  'adwoa beauty',
  'Grande Cosmetics',
  'Biossance',
  'REFY',
  'Maison Margiela',
  'Dolce&Gabbana',
  'ROSE INC',
  'LANEIGE',
  'Versace',
  'Valentino',
  'Smashbox',
  'Elemis',
  'Slip',
  'Shani Darden Skin Care',
  'KVD Beauty',
  'Sulwhasoo',
  'First Aid Beauty',
  'L\'Oréal Professionnel',
  'COOLA',
  'The 7 Virtues',
  'innisfree',
  'amika',
  'Bio Ionic',
  'ALPYN',
  'Summer Fridays',
  'Rossano Ferretti Parma',
  'Armani Beauty',
  'Josie Maran',
  'Augustinus Bader',
  'Dr. Barbara Sturm',
  'Lion Pose',
  'Tabu',
  'KILIAN Paris',
  'ALTERNA Haircare',
  'Sunday Riley',
  'Cinema Secrets',
  'Function of Beauty PRO',
  'Juliette Has a Gun',
  'TULA Skincare',
  'CAY SKIN',
  'SOFIE PAVITT FACE—NEW',
  'PAT McGRATH LABS',
  'Clarins',
  'bareMinerals',
  'ONE/SIZE by Patrick Starrr',
  'SHAZ & KIKS',
  '54 Thrones',
  'PATRICK TA',
  'Jo Malone London',
  'JVN',
  'Element Eight—NEW',
  'Dieux',
  'Act+Acre',
  'Mugler',
  'shu uemura',
  'L\'Occitane',
  'Hyper Skin',
  'NARS',
  'COLOR WOW',
  'Lancôme',
  'Supergoop!',
  'Dermalogica',
  'NUDESTIX',
  'Rare Beauty by Selena Gomez',
  'Virtue',
  'Nutrafol',
  'Ralph Lauren',
  'Prada',
  'MARA',
  'Commodity',
  'Milk Makeup',
  'Drunk Elephant',
  'Rahua',
  'Kate McLeod',
  'Iconic London',
  'CHANEL',
  'Henry Rose',
  'OLEHENRIKSEN',
  'Lilly Lashes',
  'Iris&Romeo',
  'ghd',
  'Soft Services',
  'DAMDAM',
  'BURBERRY',
  'Peace Out',
  'Davines',
  'Mango People',
  'Nette',
  'KORRES',
  'Topicals',
  'Origins',
  'Touchland',
  'JIMMY CHOO',
  'ISDIN',
  'Glow Recipe',
  'Peter Thomas Roth',
  'The INKEY List',
  'Danessa Myricks Beauty',
  'Givenchy',
  'HigherDOSE',
  'Mario Badescu',
  'Freck Beauty',
  'The Ordinary',
  'StriVectin',
  'Saie',
  'K18 Biomimetic Hairscience',
  'Briogeo',
  'BaBylissPRO',
  'Blinc',
  'BASMA',
  'Shiseido',
  'Verb',
  'Gucci',
  'SK-II',
  'Viseart',
  'dae',
  'Tata Harper',
  'By Rosie Jane',
  'Velour Lashes',
  'Nécessaire',
  'Fashion Fair',
  'Caudalie',
  'VOLUSPA',
  'SEPHORA COLLECTION',
  'Kosas',
  '5 SENS',
  'Carolina Herrera',
  'Chloé',
  'Moon Juice',
  'Luna Daily',
  'OUAI',
  'Glamnetic',
  'Olaplex',
  'Rabanne',
  'NuFACE',
  'CANOPY',
  'Dr. Dennis Gross Skincare',
  'DIOR',
  'Skylar',
  'PHLUR',
  'Glossier',
  'Maison Louis Marie',
  'AESTURA—NEW',
  'fresh',
  'Melt Cosmetics',
  'Fable & Mane',
  'SUNDAY II SUNDAY',
  'RIES',
  'MERIT',
  'LIGHTSAVER',
  'Viktor&Rolf',
  'maude',
  'Oribe',
  'Tatcha',
  'Bobbi Brown',
  'Smile Makers',
  'ciele',
  'Charlotte Tilbury',
  'Sourse',
  'PHYLA—NEW',
  'IGK',
  'belif',
  'Boy Smells',
  'The Original MakeUp Eraser',
  'Laura Mercier',
  'HERMÈS',
  'Ariana Grande',
  'OUI the People',
  'IT Cosmetics',
  'Artist Couture',
  'KAYALI',
  'GUERLAIN',
  'MAKEUP BY MARIO',
  'Range Beauty—NEW',
  'Shark Beauty',
  'GXVE BY GWEN STEFANI',
  'Youth To The People',
  'CLEAN RESERVE',
  'tarte',
  'Dr. Idriss',
  'Sol de Janeiro',
  'NATASHA DENONA',
  'Westman Atelier',
  'Pureology',
  'World of Chris Collins',
  'HAUS LABS BY LADY GAGA',
  'BREAD BEAUTY SUPPLY',
  'Anastasia Beverly Hills',
  'Montale',
  'La Mer',
  'ROSE Ingleton MD',
  'Curlsmith',
  'The Rootist',
  'Mizani',
  'Living Proof',
  'Dyson',
  'Ellis Brooklyn',
  'Lux Unfiltered',
  'HUDA BEAUTY',
  'Wander Beauty',
  'Floral Street',
  'Emi Jay—NEW',
  'Hourglass',
  'RŌZ—NEW',
  'BeautyBio',
  'Soleil Toujours',
  'Community Sixty-Six',
  'Drybar',
  'Yves Saint Laurent',
  'Flora + Bast',
  'BROWN GIRL Jane',
  'Jack Black',
  'Isle of Paradise',
  'ILIA',
  'caliray',
  'Hanni',
  'Ceremonia',
  'Kiehl\'s Since 1851',
  'TOM FORD',
  'LoveShackFancy',
  'Marc Jacobs Fragrances',
  'The Maker',
  'AERIN',
  'ISAMAYA—NEW',
  'Prada Beauty',
  'Farmacy',
  'Melanin Haircare',
  'stila',
  'DERMAFLASH',
  'RANAVAT',
  'Sienna Naturals',
  'FORVR Mood',
  'Kate Somerville',
  'Dr. Jart+',
  'EADEM',
  'T3',
  'Fenty Beauty by Rihanna',
  'Donna Karan',
  'Jean Paul Gaultier',
  'AVRANI',
  'Dove',
  'Nivea',
  'L\'Oréal'
];


 constructor(private fb: FormBuilder, private router : Router, private prod:ProdutionService) {}


 ngOnInit(): void {
    this.delayForm = this.fb.group({
      Categorie: ['', Validators.required],
      Brand: ['', Validators.required],
     Price: [null, [Validators.required, Validators.min(0)]]
    });

    const role = localStorage.getItem('role');
    if( role !== 'admin' && role !== 'production'){
          this.router.navigate(['/dashboard']);
        }
  }


  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.showResult = false;

    if (this.delayForm.invalid) {
      return;
    }

    const formData = this.delayForm.value;
    const token = localStorage.getItem('token');
    this.prod.getDelay(formData, token!).subscribe(
      (response: any) => {
        this.prediction = response.prediction;
        this.label = response.label;
        if (response.label=== "À l'heure"){
          this.label = "On time";
        }else{
          this.label = "delayed";
        }

          

        this.showResult = true;
      },
      (error: any) => {
        this.errorMessage = 'An error occurred while fetching the prediction. Please try again.';
        console.error('Error:', error);
      }
    );
  }

  resetForm(): void {
    this.delayForm.reset();
    this.submitted = false;
    this.errorMessage = '';
    this.showResult = false;
  }

}

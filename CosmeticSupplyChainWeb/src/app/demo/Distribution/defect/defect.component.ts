import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DistributionService } from 'src/app/services/distribution.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-defect',
  templateUrl: './defect.component.html',
  styleUrls: ['./defect.component.scss']
})
export class DefectComponent implements OnInit {
  defectForm: FormGroup;
  defectResult: any = null;

  yesNoOptions = ['Oui', 'Non'];
  temperatureOptions = [
    '4-8°C (Réfrigéré)',
    '15-25°C (Température ambiante)'
  ];

  // You can populate these later
  sizeVolumeOptions: string[] = [
    'Size 0.08 oz, 2.3g',
    'Size 5 oz / 150 mL',
    'Size: 0.42 oz/ 12 g',
    'Size: 3 oz / 90 mL',
    'Size 0.056oz',
    'Size 0.049 oz/ 1.4 g',
    'Size: 5.07 oz/ 150 mL',
    'Size: 1.8 oz / 55 mL',
    'Size 0.16 oz / 5 mL',
    'Size: 5.8 oz / 171 ml',
    'Size 0.246 oz / 7g',
    'Size: 13 oz/ 384.5 mL',
    'Size: .84 oz',
    'Size 0.15 oz',
    'Size 0.134 oz',
    'Size Lychee / 1 piece',
    'Size: .33 / 10 mL eau de parfum spray',
    'Size 2 oz/ 56.7 g',
    'Size: .34 oz / 10 mL eau de toilette spray',
    'Size 1.3 oz / 40 ml',
    'Size: 2.71 fl oz / 80 ml',
    'Size: 6.3 oz/ 178.6 g',
    'Size 1.6 oz / 28.3 g',
    'Size: 30 pack',
    'Size 0.18 oz/ 5 g',
    'Size 0.33 oz',
    'Size 0.098 oz  / 2.8g',
    'Size: 1.7 / 50 Eau de Parfum Spray',
    'Size: 1.7 oz / 50ml eau de parfum spray',
    'Size 0.246 oz / 7 mL',
    'Size: 1.7 oz / 50 ml cologne spray',
    'Size: 0.48 oz/ 13.7 g',
    'Size 0.46 oz / 13 g',
    'Size: 0.50 oz / 15 mL eau de parfum spray',
    'Size 0.05 oz - mini/ 1.4 g',
    'Size: 8.0 oz/ 236 mL',
    'Size: 0.67 oz/ 20 mL perfume oil rollerball',
    'Size 0.15 oz / 4.5g',
    'Size: 3.4 oz / 100 ml Refill',
    'Size: 3.3 oz',
    'Size: 3.4 oz / 95 ml',
    'Size 0.39 oz',
    'Size: 1.4 oz/ 40 g Original Scent',
    'Size: 2.5 oz / 75 mL',
    'Size: 0.28 oz/ 8 g',
    'Size 0.003 oz/ 0.085 g',
    'Size: 0.45 oz/ 13 g',
    'Size 0.01 oz/ 0.28 g',
    'Size: 2.8 oz / 80 g Hua Bliss: Strengthening Lavender Rice Water Shampoo Bar',
    'Size 0.33 oz / 9.75 mL',
    'Size: 3 oz / 90 mL eau de parfum',
    'Size 0.13 oz / 3.9 ml',
    'Size: 1 / 30ml',
    'Size: 7.8 oz / 220 g',
    'Size: 1.86 oz / 60 ml',
    'Size 0.45 oz / 13.5 ml',
    'Size: 165 sheets',
    'Size 0.507 oz / 15 mL',
    'Size 0.22 oz/ 6.3 g',
    'Size: 0.35 oz/ 10 g',
    'Size: 0.5 oz/ 15 mL (refill)',
    'Size: 3.7 oz / 104 g',
    'Size: 1 oz/ 30 mL eau de toilette spray',
    'Size: 6.6 oz / 150 ml',
    'Size: 3.4 oz / 100 mL eau de parfum',
    'Size 0.21 oz/ 6.21 mL',
    'Size: 3.38 oz / 100 mL',
    'Size 0.11 oz/ 3.3 mL',
    'Size: .75 / 21g',
    'Size: 1.5 oz/ 60 mL',
    'Size: 3 oz/ 90 ml eau de parfum spray',
    'Size 0.74 oz / 21 g',
    'Size .12 oz / 3.5 g',
    'Size: 30 mL/ 1 oz',
    'Size 0.158 oz/ 4.5 g',
    'Size: 3.3 oz eau de toilette spray',
    'Size 0.14 oz / 4 g',
    'Size: 3 oz/ 88.7 mL',
    'Size 0.04 oz / 1.14 g',
    'Size: 8 oz/ 236 mL',
    'Size 0.1 / 3',
    'Size: 0.34 oz / 10 mL Perfume Spray',
    'Size: 5 oz/ 147 mL eau de toilette spray',
    'Size: 1.9 oz/ 54 g',
    'Size: 0.10 oz/ 3 g',
    'Size:  1.69 oz / 50 mL',
    'Size 0.67 oz / 20 ml',
    'Size: Original / 100 g',
    'Size: 2.65 oz/ 75ml',
    'Size: 13 oz / Sweet Floral Essences of Neroli, Rose, and Patchouli',
    'Size 0.19 oz / 5.6 ml',
    'Size: 0.5 oz/ 15 mL Eau de Toilette Travel Spray',
    'Size 0.4 oz / 11.3 g',
    'Size 3.4 oz / 100 ml',
    'Size: 16.23 oz / 460 g 1 wick candle',
    'Size: 10 oz/ 295 mL',
    'Size: 5 oz / 147 ml',
    'Size: 4.2 oz/ 118 g Lush Scent',
    'Size: 32 oz/ 946 mL',
    'Size: 0.12 oz/ 3.4 g',
    'Size: 5.1 oz/ 150 mL',
    'Size 2 oz',
    'Size 0.28 oz / 8 g',
    'Size: 1oz / 30ml cologne spray',
    'Size: 6.7 oz/ 198 mL',
    'Size: 0.33 ox parfum spray',
    'Size: 1.7 oz/ 50 ml eau de toilette spray',
    'Size: 4.2 oz / 125 ml eau de parfum',
    'Size 4.5 oz / 0.158 g',
    'Size: 2 oz/ 59 mL',
    'Size: 8.1 oz/ 230 g',
    'Size: 120 Capsules',
    'Size: 8 oz / 236.6 ml',
    'Size 0.35 oz/ 9.9 g',
    'Size: 1.1 oz / 30 ml',
    'Size: .5 oz / 15 mL forbidden fig diffuser oil',
    'Size: 3.4 oz/100 mL',
    'Size: 8.5 oz / 250mL',
    'Size 0.14 oz / 3.6 g',
    'Size 0.28 oz/ 8 g',
    'Size: 2 oz / 60 ml parfum spray',
    'Size 0.33 oz / 9.7 mL',
    'Size: 0.3 oz / 9 g',
    'Size .01 oz',
    'Size: 0.84 oz/ 25 mL',
    'Size: 200 mL/ 6.8 oz',
    'Size: 3.3 fl oz',
    'Size: 6.4 oz / 190 ml',
    'Size: 3.04 oz/ 90 mL',
    'Size 0.5 oz / 15 mL',
    'Size: 8.77 oz/ 250 ml',
    'Size: 1 oz',
    'Size 0.10 oz / 3.0 ml',
    'Size 6.7 oz/ 200 mL',
    'Size: 6.3 oz / 178 g',
    'Size: 0.34 oz / 10 mL eau de toilette',
    'Size: 2.53 oz / 80 g Citrus Yao: Clarifying Citrus Rice Water Conditioner Bar',
    'Size Strawberry 8 oz / 226 ml',
    'Size: 0.50 oz/ 15 mL',
    'Size 0.014 oz/ 0.4 g',
    'Size: 0.3 oz / 8.5 g - universal',
    'Size: 0.33 oz / 10 ml eau de parfum spray',
    'Size: 1.7 oz/ 50 mL eau de parfum spray',
    'Size 0.63 oz',
    'Size: 8.4 oz / 250 ml',
    'Size: 1 pc',
    'Size: 1.7 fl. oz/ 50 mL',
    'Size 0.04 oz / 1.2 g',
    'Size: 7.5 oz/ 238 mL',
    'Size 1 oz/ 30mL',
    'Size: 10 oz / 284 ml',
    'Size: 5 oz/ 142 g',
    'Size 0.19 oz / 5.7 mL',
    'Size 0.13 oz / 3.69 g',
    'Size: 5 oz/ 182 mL',
    'Size 0.113 oz / 4 mL',
    'Size: 60 patches / pack',
    'Size: 0.67 oz/ 20 mL',
    'Size 1.01 fl oz / 30 mL',
    'Size 0.034 oz/ 0.85 g',
    'Size: 5 / 150ml',
    'Size 0.077��oz / 2.2 g',
    'Size: 43.7 oz / 1239 g 4-wick candle',
    'Size 2.3 oz / 68 ml',
    'Size: 1.7 / 50',
    'Size 0.007 oz/ 0.2 g',
    'Size: 0.48 oz / 14.4 ml',
    'Size:  10.4 oz /  310 mL',
    'Size: 5.4 oz / 160 ml',
    'Size Banana .13 oz / 3.6 g',
    'Size 0.37 fl oz / 11 mL',
    'Size: 1 oz / 30 mL perfume oil oil',
    'Size: 6.7 oz  spray',
    'Size: 2.02 oz / 60 mL',
    'Size: 0.27 oz eau de parfum spray',
    'Size: 2.2 oz / 65 ml - 2 Month Supply',
    'Size: 0.45 oz./12.9 g',
    'Size: 9.9 oz / 335 ml',
    'Size: 5 / 148 eau de toilette spray',
    'Size: 0.3 oz/ 10mL',
    'Size: 0.24 oz/ 7 mL',
    'Size: 8.77 oz / 250 ml',
    'Size: 1.6 oz / 50 mL eau de parfum spray',
    'Size: 0.37 oz / 11 mL - black',
    'Size .23 oz',
    'Size 0.17 oz / 5 g',
    'Size 0.49 oz',
    'Size: 5 oz/ 179 mL',
    'Size: 0.7 oz / 20 ml eau de parfum rollerball',
    'Size: 0.25 oz / 7.5 mL travel spray',
    'Size 0.04 oz / 1.2 ml',
    'Size: 4.2 oz Pump/ 125 mL',
    'Size: 0.33 oz',
    'Size 1 oz/30 ml',
    'Size: 1.7 oz/ 50 mL Refill Size',
    'Size: 3.3 oz Eau de Parfum Spray',
    'Size: 0.20 oz / 6 mL Perfume Oil Rollerball  perfume oil',
    'Size 5.6 oz / 165 g',
    'Size: 8 oz / 240 ml',
    'Size .17 oz',
    'Size .2oz / 6ml',
    'Size 0.06 oz / 1.7 g',
    'Size: 3.3 oz / 100 mL eau de parfum',
    'Size: 1.35 oz/ 40mL',
    'Size: 3.4 oz eau de parfum',
    'Size: 1.7 oz/ 50 mL Eau de Toilette Spray',
    'Size: 6.76 oz/ 200 mL',
    'Size: 4.0 oz / 120 mL',
    'Size 6 x 0.05 oz/ 1.4 g',
    'Size 0.26 oz/ 7.85 ml',
    'Size 1.58 oz / 45 mL',
    'Size 0.18oz / 5.2g',
    'Size 0.10 oz/ 3.0 mL',
    'Size: 33.8 oz',
    'Size .11 oz/3 g',
    'Size: 16.9 oz / 500 ml...'
]
;
  brandOptions: string[] = ['Murad', 'MATTER OF FACT', 'The Nue Co.', 'MACRENE actives', 'DedCool', 'Saint Jane', 'PATTERN by Tracee Ellis Ross', 'Stripes', 'Bumble and bumble', 'Paula\'s Choice', 'FaceGym', 'Viori', 'Buxom', 'St. Tropez', 'Benefit Cosmetics', 'SIMIHAZE BEAUTY', 'Montblanc', 'Sephora Favorites', 'Gisou', 'KORA Organics', 'Salt & Stone', 'Moroccanoil', 'iNNBEAUTY PROJECT', 'TAN-LUXE', 'LYS Beauty', 'Sarah Creal', 'Kérastase', 'CLINIQUE', 'Therabody', 'Chunks', 'Ami Colé', 'Vegamour', 'Tower 28 Beauty', 'DOMINIQUE COSMETICS', 'Fara Homidi', 'Azzaro', 'BondiBoost', 'superzero', 'Naturally Serious', 'Crown Affair', 'Too Faced', 'Mane', 'Beautyblender', 'AAVRANI', 'Kulfi', 'L\'Oréal Professionnel Steampod', 'LAWLESS', 'MAKE UP FOR EVER', 'NEST New York', 'DUO', 'FOREO', 'House of Lashes', 'Then I Met You', 'Hello Sunday', 'Herbivore', 'Urban Decay', 'goop', 'Kaja', 'Skinfix', 'Estée Lauder', 'ABBOTT', 'TWEEZERMAN', 'adwoa beauty', 'Grande Cosmetics', 'Biossance', 'REFY', 'Maison Margiela', 'Dolce&Gabbana', 'ROSE INC', 'LANEIGE', 'Versace', 'Valentino', 'Smashbox', 'Elemis', 'Slip', 'Shani Darden Skin Care', 'KVD Beauty', 'Sulwhasoo', 'First Aid Beauty', 'L\'Oréal Professionnel', 'COOLA', 'The 7 Virtues', 'innisfree', 'amika', 'Bio Ionic', 'ALPYN', 'Summer Fridays', 'Rossano Ferretti Parma', 'Armani Beauty', 'Josie Maran', 'Augustinus Bader', 'Dr. Barbara Sturm', 'Lion Pose', 'Tabu', 'KILIAN Paris', 'ALTERNA Haircare', 'Sunday Riley', 'Cinema Secrets', 'Function of Beauty PRO', 'Juliette Has a Gun', 'TULA Skincare', 'CAY SKIN', 'SOFIE PAVITT FACE—NEW', 'PAT McGRATH LABS', 'Clarins', 'bareMinerals', 'ONE/SIZE by Patrick Starrr', 'SHAZ & KIKS', '54 Thrones', 'PATRICK TA', 'Jo Malone London', 'JVN', 'Element Eight—NEW', 'Dieux', 'Act+Acre', 'Mugler', 'shu uemura', 'L\'Occitane', 'Hyper Skin', 'NARS', 'COLOR WOW', 'Lancôme', 'Supergoop!', 'Dermalogica', 'NUDESTIX', 'Rare Beauty by Selena Gomez', 'Virtue', 'Nutrafol', 'Ralph Lauren', 'Prada', 'MARA', 'Commodity', 'Milk Makeup', 'Drunk Elephant', 'Rahua', 'Kate McLeod', 'Iconic London', 'CHANEL', 'Henry Rose', 'OLEHENRIKSEN', 'Lilly Lashes', 'Iris&Romeo', 'ghd', 'Soft Services', 'DAMDAM', 'BURBERRY', 'Peace Out', 'Davines', 'Mango People', 'Nette', 'KORRES', 'Topicals', 'Origins', 'Touchland', 'JIMMY CHOO', 'ISDIN', 'Glow Recipe', 'Peter Thomas Roth', 'The INKEY List', 'Danessa Myricks Beauty', 'Givenchy', 'HigherDOSE', 'Mario Badescu', 'Freck Beauty', 'The Ordinary', 'StriVectin', 'Saie', 'K18 Biomimetic Hairscience', 'Briogeo', 'BaBylissPRO', 'Blinc', 'BASMA', 'Shiseido', 'Verb', 'Gucci', 'SK-II', 'Viseart', 'dae', 'Tata Harper', 'By Rosie Jane', 'Velour Lashes', 'Nécessaire', 'Fashion Fair', 'Caudalie', 'VOLUSPA', 'SEPHORA COLLECTION', 'Kosas', '5 SENS', 'Carolina Herrera', 'Chloé', 'Moon Juice', 'Luna Daily', 'OUAI', 'Glamnetic', 'Olaplex', 'Rabanne', 'NuFACE', 'CANOPY', 'Dr. Dennis Gross Skincare', 'DIOR', 'Skylar', 'PHLUR', 'Glossier', 'Maison Louis Marie', 'AESTURA—NEW', 'fresh', 'Melt Cosmetics', 'Fable & Mane', 'SUNDAY II SUNDAY', 'RIES', 'MERIT', 'LIGHTSAVER', 'Viktor&Rolf', 'maude', 'Oribe', 'Tatcha', 'Bobbi Brown', 'Smile Makers', 'ciele', 'Charlotte Tilbury', 'Sourse', 'PHYLA—NEW', 'IGK', 'belif', 'Boy Smells', 'The Original MakeUp Eraser', 'Laura Mercier', 'HERMÈS', 'Ariana Grande', 'OUI the People', 'IT Cosmetics', 'Artist Couture', 'KAYALI', 'GUERLAIN', 'MAKEUP BY MARIO', 'Range Beauty—NEW', 'Shark Beauty', 'GXVE BY GWEN STEFANI', 'Youth To The People', 'CLEAN RESERVE', 'tarte', 'Dr. Idriss', 'Sol de Janeiro', 'NATASHA DENONA', 'Westman Atelier', 'Pureology', 'World of Chris Collins', 'HAUS LABS BY LADY GAGA', 'BREAD BEAUTY SUPPLY', 'Anastasia Beverly Hills', 'Montale', 'La Mer', 'ROSE Ingleton MD', 'Curlsmith', 'The Rootist', 'Mizani', 'Living Proof', 'Dyson', 'Ellis Brooklyn', 'Lux Unfiltered', 'HUDA BEAUTY', 'Wander Beauty', 'Floral Street', 'Emi Jay—NEW', 'Hourglass', 'RŌZ—NEW', 'BeautyBio', 'Soleil Toujours', 'Community Sixty-Six', 'Drybar', 'Yves Saint Laurent', 'Flora + Bast', 'BROWN GIRL Jane', 'Jack Black', 'Isle of Paradise', 'ILIA', 'caliray', 'Hanni', 'Ceremonia', 'Kiehl\'s Since 1851', 'TOM FORD', 'LoveShackFancy', 'Marc Jacobs Fragrances', 'The Maker', 'AERIN', 'ISAMAYA—NEW', 'Prada Beauty', 'Farmacy', 'Melanin Haircare', 'stila', 'DERMAFLASH', 'RANAVAT', 'Sienna Naturals', 'FORVR Mood', 'Kate Somerville', 'Dr. Jart+', 'EADEM', 'T3', 'Fenty Beauty by Rihanna', 'Donna Karan', 'Jean Paul Gaultier'
];
  categorieOptions: string[] = ['Autre',
'Soins',
'Maquillage',
'Cheveux',
'Parfums',
'Hygiène',];

  constructor(private fb: FormBuilder, private http: HttpClient , private dist :DistributionService , private router: Router,) {}

  ngOnInit(): void {
    this.defectForm = this.fb.group({
      Price: [null, [Validators.required, Validators.min(0)]],
      Average_Rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      Sensible: [null, Validators.required],
      Stocker_sans_lumiere: [null, Validators.required],
      Temperature: [null, Validators.required],
      Size_Volume: [null, Validators.required],
      Brand: [null, Validators.required],
      Categorie: [null, Validators.required]
    });
  
    const role = localStorage.getItem('role') || '';
    // get the role of the user
       console.log(role);
       // Check if the role is not 'admin' or 'procurement' redirect to the dashboard or not and 
       if( role !== 'admin' && role !== 'distribution'){
         this.router.navigate(['/dashboard']);
       }
  }

  onSubmitDefect(): void {
    if (this.defectForm.invalid) return;

    const payload = this.defectForm.value;

    const token = localStorage.getItem('token') || '';  
    this.dist.getPredictionDefect(payload, token).subscribe(
      (response) => {
        this.defectResult = response;
        console.log('Prediction Result:', this.defectResult);
      },
      (error) => {
        console.error('Error:', error);
      }
    );


  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcurementService } from 'src/app/services/MachineLearning/procurement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prob-delay',
  templateUrl: './prob-delay.component.html',
  styleUrls: ['./prob-delay.component.scss']
})
export class ProbDelayComponent  implements OnInit{


  deliveryForm!: FormGroup;
  submitted = false;
  errorMessage: string = '';
  prediction: 'Yes' | 'No' = 'No';
  probability_of_delay: number = 0;
  showResult = false;

  delayCauses: string[] = [
    "Changement réglementation", "Panne système informatique", "Mauvais temps port",
    "Retard fournisseur sous-traitant", "Grève locale", "Changement planning",
    "Panne véhicule", "Grève ouvriers locaux", "Mauvais temps livraison",
    "Maintenance équipement", "Erreur commande", "Erreur logistique",
    "Maintenance usine retardée", "Mauvais temps affectant livraison",
    "Problème stock", "Grève partielle employés", "Problème logistique interne",
    "Retard transport régional", "Pénurie de matière première", "Maintenance imprévue",
    "Pénurie carburant transport", "Problème qualité huile", "Retard fournisseur matière",
    "Problème étiquetage", "Pénurie huile essentielle", "Grève transporteurs",
    "Problème qualité rose", "Mauvais temps régional", "Problème de transport routier",
    "Problème informatique", "Problème qualité matière", "Retard sous-traitant local",
    "Changement priorité production", "Retard transporteur externe", "Grève régionale",
    "Maintenance machines", "Délai paiement fournisseur", "Changement planning production",
    "Inspection qualité prolongée", "Retard récolte oasis", "Retard douane export",
    "Retard zone industrielle", "Retard paiement fournisseur", "Inspection sanitaire",
    "Grève employés", "Panne générateur usine", "Erreur système informatique",
    "Retard transport Sousse", "Problème route désertique", "Pénurie matière première",
    "Erreur préparation commande", "Retard port Bizerte", "Retard livraison locale",
    "Distance centres logistiques", "Problème qualité produit", "Grève des transporteurs",
    "Maintenance presse huile", "Embouteillage routier", "Retard approvisionnement eau",
    "Problème stock matière", "Changement de réglementation", "Pénurie olives",
    "Délais douaniers export", "Inspection usine", "Tourisme saisonnier",
    "Problème qualité extrait", "Maintenance usine", "Retard sous-traitant",
    "Erreur de commande", "Panne équipement extraction", "Distance oasis-centres logistiques",
    "Délais paiement client", "Inspection qualité", "Retard port Tunis",
    "Grève transport maritime", "Retard port Sfax", "Tempête de sable",
    "Panne véhicule livraison", "Mauvais temps récolte", "Changement horaire transport",
    "Retard douanier à Tunis", "Retard transport intérieur", "Panne machine production",
    "Problème informatique interne", "Congestion au port", "Panne véhicule transport",
    "Inspection environnementale", "Erreur logistique interne", "Retard récolte dattes",
    "Volume production élevé", "Problème transport routier", "Pénurie carburant",
    "Délais douaniers", "Retard livraison emballage", "Problème emballage",
    "Mauvais temps affectant port", "Retard récolte palmiers", "Pénurie cèdre",
    "Pénurie eau traitement", "Panne équipement", "Retard paiement client",
    "Problème approvisionnement fleurs", "Problème récolte oliviers",
    "Problème récolte cèdres", "Erreur commande client", "Congestion trafic urbain",
    "Embouteillage logistique"
  ];

  constructor(private fb: FormBuilder,private router: Router, private procService:ProcurementService ) {}

  ngOnInit(): void {
    this.deliveryForm = this.fb.group({
      Quantity: [null, Validators.required],
      supplier_avg_delay: [null, Validators.required],
      Price__USD_per_unit: [null, Validators.required],
      Delay_Cause: ['', Validators.required]
    });

    const role = localStorage.getItem('role') || '';
   // get the role of the user
      console.log(role);
      // Check if the role is not 'admin' or 'procurement' redirect to the dashboard or not and 
      if( role !== 'admin' && role !== 'procurment'){
        this.router.navigate(['/dashboard']);
      }
      
  }

  get f() {
    return this.deliveryForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.showResult = false;

    if (this.deliveryForm.invalid) {
      return;
    }
    const token  = localStorage.getItem('token') || '';

    const formData = this.deliveryForm.value;
    console.log(formData);
    this.procService.getProbabilityofDelay(formData,token).subscribe(
      (response: any) => {
        console.log(response);
        this.prediction = response.prediction;
        this.probability_of_delay = response.probability_of_delay;
        this.showResult = true;
      },
      (error: any) => {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred while fetching the prediction.';
      }
  )

  }

  Navigate(): void {
    // Navigation logic if required
  }

}

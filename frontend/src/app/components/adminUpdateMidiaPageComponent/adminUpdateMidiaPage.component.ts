import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { AdminUpdateMidiaPageService } from './adminUpdateMidiaPage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMidia } from 'src/app/shared/models/midia';


@Component({
    templateUrl: 'adminUpdateMidiaPage.component.html',
    styleUrls: ['adminUpdateMidiaPage.component.css']
})
export class AdminUpdateMidiaPageComponent implements OnInit {
    midiaId: string;
    midia: IMidia;
    midiaForm: FormGroup;
    // 
    image: File = null;
    choosen: boolean = false;
    save: boolean = false;
    hasImageSelected: boolean = false;

    constructor(private route: ActivatedRoute, private fb: FormBuilder, private adminUpdateMidiaPageService: AdminUpdateMidiaPageService) {
        this.route.params.subscribe(params => {
            this.midiaId = params['id'];
        });
    }

    ngOnInit(): void {
        this.handleMidiaForm();
        this.findByIdMidia(this.midiaId);
    }

    handleMidiaForm(): void {
        this.midiaForm = this.fb.group({
            category: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(6)]],
            imagePath: ['', Validators.required],
            name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
            trailerUrl: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
        });
    }

    fillMidiaForm(dataMidia: IMidia): void {
        const { category, name, trailerUrl } = dataMidia;

        this.midiaForm.setValue({
            category: category,
            imagePath: null,
            name: name,
            trailerUrl: trailerUrl
        });
    }

    findByIdMidia(id: string): void {
        this.adminUpdateMidiaPageService.findByIdMidia(id).subscribe({
            next: dataMidia => {
                this.midia = dataMidia['midia'];

                this.fillMidiaForm(dataMidia['midia']);
            },
            error: err => console.error(err)
        })
    }

    fileChoosen(event): void {
        if (event.target.value) {
            this.image = <File>event.target.files[0];
            this.choosen = true;
        }
    }

    submitPhoto(): void {
        const category = this.midiaForm.controls.category.value;
        const formData = new FormData();

        if (!this.image) { return; }

        formData.append('midiaImage', this.image, this.image.name);

        if (category === 'Movies') {
            this.adminUpdateMidiaPageService.uploadMovie(formData).subscribe({
                next: _ => { },
                error: err => console.error(err)
            });
        }

        if (category === 'Series') {
            this.adminUpdateMidiaPageService.uploadSerie(formData).subscribe({
                next: _ => { },
                error: err => console.error(err)
            });
        }
    }

    updateMidia(midia: IMidia): void {
        this.adminUpdateMidiaPageService.updateMidia(midia).subscribe({
            next: _ => { },
            error: err => console.error(err)
        });
    }

    onSubmit(): void {
        const category = this.midiaForm.controls.category.value;
        const imagePath = this.midiaForm.controls.imagePath.value.split('\\');

        let midia = { ...this.midiaForm.value, id: this.midiaId };

        delete midia['imagePath'];

        if (category === 'Movies') {
            midia = { ...midia, imagePath: `../../assets/movies/${imagePath[imagePath.length - 1]}` }

            this.updateMidia(midia);
        }

        if (category === 'Series') {
            midia = { ...midia, imagePath: `../../assets/series/${imagePath[imagePath.length - 1]}` }

            this.updateMidia(midia);
        }
    }
}
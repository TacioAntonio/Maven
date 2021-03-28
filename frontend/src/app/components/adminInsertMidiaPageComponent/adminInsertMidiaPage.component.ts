import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminInsertMidiaPageService } from './adminInsertMidiaPage.service';
import { IMidia } from 'src/app/shared/models/midia';

@Component({
    templateUrl: 'adminInsertMidiaPage.component.html',
    styleUrls: ['adminInsertMidiaPage.component.css']
})
export class AdminInsertMidiaPageComponent implements OnInit {
    midiaForm: FormGroup;
    image: File = null;
    choosen: boolean = false;
    save: boolean = false;
    hasImageSelected: boolean = false;

    constructor(private fb: FormBuilder, private adminInsertMidiaPageService: AdminInsertMidiaPageService) { }

    ngOnInit(): void {
        this.handleMidiaForm();
    }

    handleMidiaForm(): void {
        this.midiaForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
            imagePath: ['', Validators.required],
            trailerUrl: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
            category: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(6)]]
        });
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
            this.adminInsertMidiaPageService.uploadMovie(formData).subscribe({
                next: _ => { },
                error: err => console.error(err)
            });
        }

        if (category === 'Series') {
            this.adminInsertMidiaPageService.uploadSerie(formData).subscribe({
                next: _ => { },
                error: err => console.error(err)
            });
        }
    }

    insertMidia(midia: IMidia): void {
        this.adminInsertMidiaPageService.insertMidia(midia).subscribe({
            next: _ => { },
            error: err => console.error(err)
        })
    }

    onSubmit(): void {
        const category = this.midiaForm.controls.category.value;
        const imagePath = this.midiaForm.controls.imagePath.value.split('\\');

        let midia = { ...this.midiaForm.value }

        delete midia['imagePath'];

        if (category === 'Movies') {
            midia = { ...midia, imagePath: `../../assets/movies/${imagePath[imagePath.length - 1]}` }

            this.insertMidia(midia);
        }

        if (category === 'Series') {
            midia = { ...midia, imagePath: `../../assets/series/${imagePath[imagePath.length - 1]}` }

            this.insertMidia(midia);
        }
    }
}
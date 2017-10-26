import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { PeopleService } from '../services/people.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  person = {};
  people = [];
  isLoading = true;
  isEditing = false;
  availableToAdd = true;

  addPersonForm: FormGroup;
  name = new FormControl('', Validators.required);

  constructor(private peopleService: PeopleService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getPeople();
    this.addPersonForm = this.formBuilder.group({
      name: this.name
    });
  }

  getPeople() {
    this.peopleService.getPeople().subscribe(
      data => this.people = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addPerson() {
    this.peopleService.addPerson(this.addPersonForm.value).subscribe(
      res => {
        const newPerson = res.json();
        this.people.push(newPerson);
        this.addPersonForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(person) {
    this.isEditing = true;
    this.person = person;
  }

  cancelEditing() {
    this.isEditing = false;
    this.person = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the people to reset the editing
    this.getPeople();
  }

  editPerson(person) {
    this.peopleService.editPerson(person).subscribe(
      res => {
        this.isEditing = false;
        this.person = person;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deletePerson(person) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.peopleService.deletePerson(person).subscribe(
        res => {
          const pos = this.people.map(elem => elem._id).indexOf(person._id);
          this.people.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  setVisibility() {
    this.availableToAdd = !this.availableToAdd;
  }

}

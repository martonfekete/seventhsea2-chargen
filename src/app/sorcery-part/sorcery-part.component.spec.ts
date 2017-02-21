/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SorceryPartComponent } from './sorcery-part.component';

describe('SorceryPartComponent', () => {
  let component: SorceryPartComponent;
  let fixture: ComponentFixture<SorceryPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorceryPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SorceryPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

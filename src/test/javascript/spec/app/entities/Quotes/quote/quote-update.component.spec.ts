import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ApiGatewayApplicationTestModule } from '../../../../test.module';
import { QuoteUpdateComponent } from 'app/entities/Quotes/quote/quote-update.component';
import { QuoteService } from 'app/entities/Quotes/quote/quote.service';
import { Quote } from 'app/shared/model/Quotes/quote.model';

describe('Component Tests', () => {
  describe('Quote Management Update Component', () => {
    let comp: QuoteUpdateComponent;
    let fixture: ComponentFixture<QuoteUpdateComponent>;
    let service: QuoteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApiGatewayApplicationTestModule],
        declarations: [QuoteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(QuoteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QuoteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuoteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Quote(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Quote();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

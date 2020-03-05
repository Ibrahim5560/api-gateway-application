import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IQuote, Quote } from 'app/shared/model/Quotes/quote.model';
import { QuoteService } from './quote.service';

@Component({
  selector: 'jhi-quote-update',
  templateUrl: './quote-update.component.html'
})
export class QuoteUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    quote: [null, [Validators.required]],
    price: [null, [Validators.required]],
    lastQuote: [null, [Validators.required]]
  });

  constructor(protected quoteService: QuoteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quote }) => {
      if (!quote.id) {
        const today = moment().startOf('day');
        quote.lastQuote = today;
      }

      this.updateForm(quote);
    });
  }

  updateForm(quote: IQuote): void {
    this.editForm.patchValue({
      id: quote.id,
      quote: quote.quote,
      price: quote.price,
      lastQuote: quote.lastQuote ? quote.lastQuote.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const quote = this.createFromForm();
    if (quote.id !== undefined) {
      this.subscribeToSaveResponse(this.quoteService.update(quote));
    } else {
      this.subscribeToSaveResponse(this.quoteService.create(quote));
    }
  }

  private createFromForm(): IQuote {
    return {
      ...new Quote(),
      id: this.editForm.get(['id'])!.value,
      quote: this.editForm.get(['quote'])!.value,
      price: this.editForm.get(['price'])!.value,
      lastQuote: this.editForm.get(['lastQuote'])!.value ? moment(this.editForm.get(['lastQuote'])!.value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuote>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}

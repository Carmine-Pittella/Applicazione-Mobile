import { Injectable } from '@angular/core';
import { Feedback } from "./Feedback";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  listFeedback: Feedback[] = [
    {
      id: 1,
      id_utente: 2,
      id_cache: 1,
      text: "molto divertente, è stato difficile da trovare ma le indicazioni erano dettagliate"
    }
  ]

  constructor() { }

  aggiungiFeedback(feedback: Feedback) {
    feedback.id = this.listFeedback[this.listFeedback.length - 1].id + 1
    this.listFeedback.push(feedback)
  }

  isFeedbackLasciato(utente: number, cache: number): boolean {
    return this.listFeedback.some(feedback => feedback.id_utente === utente && feedback.id_cache === cache);
  }

  getFeedbackByUtenteCache(utente: number, cache: number): Feedback {
    const feedback = this.listFeedback.find(f => f.id_utente === utente && f.id_cache === cache);
    return feedback ? feedback : new Feedback();
  }

  getListaFeedbackPerCache(cache: number): Feedback[] {
    return this.listFeedback.filter(feedback => feedback.id_cache === cache);
  }
}



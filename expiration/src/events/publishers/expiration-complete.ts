import { Publisher, ExpirationCompleted, Subjects } from '@zbtickets/common';

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompleted> {
  readonly subject = Subjects.ExpirationCompleted;
}

import { Document } from 'mongoose';

interface INotification {
  subscription: PushSubscription | Object | any;
  rooms: string[];
  deleted?: boolean;
}

export default INotification;

// connection to nats streaming server
//? this file is wrapping nats to connect in similar way as we connect mongoose --
//? in nats-connection.ts, we are connecting nats as like we connect mongoose , just bcoz of this file

import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  // whenever we publish a msg, we need to provide stan client -- so this is how we will get the client
  get client() {
    // this is a getter method
    if (!this._client)
      throw new Error('Cannot access NATS client before connecting');

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string): Promise<void> {
    this._client = nats.connect(clusterId, clientId, { url });

    //? this.client will return the this._client
    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();

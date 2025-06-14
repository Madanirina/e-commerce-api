import { Injectable, OnModuleInit } from '@nestjs/common';
import { ZBClient } from 'zeebe-node';

@Injectable()
export class ZeebeService implements OnModuleInit {
  private zbClient: ZBClient;

  onModuleInit() {
    this.zbClient = new ZBClient('localhost:26500');
    this.createWorker();
  }

  async startOrderWorkflow(orderId: string) {
    return this.zbClient.createProcessInstance({
      bpmnProcessId: 'order-process',
      variables: {
        orderId,
      },
    });
  }

  private createWorker() {
    this.zbClient.createWorker({
      taskType: 'validate-payment',
      taskHandler: async (job: any) => {
        console.log('✅ Paiement validé pour la commande :', job.variables.orderId);

        await job.complete();
        return 'JOB_ACTION_ACKNOWLEDGEMENT' as const;
      },
    });

    console.log('👷 Worker "validate-payment" démarré');
  }
}

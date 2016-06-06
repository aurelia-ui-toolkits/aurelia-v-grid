import {inject} from 'aurelia-framework';
import {activationStrategy} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TaskQueue} from 'aurelia-framework';
import {developmentStyle, SampleStateService} from './shared/sample-state-service';

@inject(EventAggregator, TaskQueue, SampleStateService)
export class SampleRunner {

  constructor(ea, taskQueue, sampleStateService) {
    this.sampleStateService = sampleStateService;
    this.taskQueue = taskQueue;
    this.ea = ea;
    this.subscriptions = [];
  }

  attached() {
    this.subscriptions.push(this.ea.subscribe('sample-state-service:style-changed', this.restart.bind(this)));
  }
  
  detached() {
    this.subscriptions.forEach(sub => sub.dispose());
  }

  activate(params, route) {
    let sample = route.navModel.config.sample;
    sample = this.enhanceSample(sample);

    if (!sample) throw new Error('Route does not contain a \'sample\' property');

    this.sample = sample;
  }

  enhanceSample(sample) {
    let style = this.sampleStateService.getStyle().key;
    sample._path = `${sample.path}-${style}`;

    sample.files.forEach(extension => {
      sample[`_${extension}`] = `${sample._path}.${extension}`;
    });
    
    console.log('loading sample path:', sample._path);
    
    return sample;
  }

  restart() {
    let old = this.sample;
    this.sample = undefined;
    this.taskQueue.queueTask(() => {
      this.sample = this.enhanceSample(old);
      this.sample = old;
    });
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }
}

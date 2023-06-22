export class RequestRateLimiter {
  private lastRequestTime: number = 0;

  private minDelayBetweenRequests: number;

  constructor(minDelayBetweenRequests: number) {
    this.minDelayBetweenRequests = minDelayBetweenRequests;
  }

  public checkRequestRate(): void {
    const currentTime = Date.now();
    const timeDiff = currentTime - this.lastRequestTime;

    if (timeDiff < this.minDelayBetweenRequests) {
      throw new Error('Слишком много запросов');
    }

    this.lastRequestTime = currentTime;
  }
}

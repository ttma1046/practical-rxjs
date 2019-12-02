import {
  forkJoin,
  from,
  fromEvent,
  interval,
  Observable,
  Observer,
  of,
  Subject,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
  throwError,
  timer,
  zip,
  Subscriber,
  iif
} from "rxjs";

import {
  catchError,
  concatMap,
  debounceTime,
  delay,
  filter,
  finalize,
  first,
  last,
  map,
  mergeAll,
  mergeMap,
  multicast,
  publish,
  retry,
  scan,
  switchAll,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  throttleTime,
  withLatestFrom,
  retryWhen,
  startWith
} from "rxjs/operators";

function print(val: any, lineId: string) {
  const el = document.createElement("p");
  el.innerText = val;
  const line = document.querySelector("div#line-" + lineId);
  line.appendChild(el);
}

/*
const getDataButton = document.querySelector("#getDataButton");

const click$ = fromEvent(getDataButton, "click");

function fakeGetData() {
  return new Observable((subscriber: Subscriber<{}>) => {
    if (Math.random() >= 0.5) {
      print("return data", "line-one");
      subscriber.next("data");
      subscriber.complete();
    } else {
      print("error", "line-one");

      subscriber.error(new Error("bad luck"));
    }
  });
}

function otherfakeGetData() {
  return new Observable((subscriber: Subscriber<{}>) => {
    if (Math.random() > 0.5) {
      subscriber.next("data");
      subscriber.complete();
    } else {
      subscriber.error(new Error("bad luck"));
    }
  });
}

fakeAsyncGetData()
  .pipe(
    switchMap(data =>
      iif(
        () => data.flag === true,
        fakeAsyncGetFollowingDataIfFlagisTrue(),
        fakeAsyncGetFollowingDataIfFlagisFalse()
      )
    )
  )
  .subscribe({
    next: x => print(x, "line-one"),
    error: error => print(error, "line-two")
  });

otherfakeGetData()
  .pipe(
    concatMap(() =>
      fakeGetData().pipe(
        retry(),

        catchError(error => {
          print("it is okay", "line-one");
          return throwError("it is okay");
        })
      )
    ),
    catchError(error => throwError("it is other okay"))
  )
  .subscribe({
    next: x => print(x, "line-one"),
    error: error => print(error, "line-two")
  });

click$
  .pipe(
    concatMap(() =>
      fakeGetData().pipe(
        tap({
          error() {
            print("error catched.", "line-one");
          }
        }),
        retry(),
        retryWhen(error$ => {
          console.log("setting up retrying");

          return error$.pipe(
            switchMap(
              (err): Observable<any> => {
                if (navigator.onLine) {
                  return timer(1000);
                } else {
                  return fromEvent(document, "online");
                }
              }
            )
          );
        }),
        catchError(error => {
          print("it is okay", "line-one");
          return throwError("it is okay");
        })
      )
    ),
    catchError(error => throwError("it is other okay"))
  )
  .subscribe({
    next: x => print(x, "line-one"),
    error: error => print(error, "line-two")
  });
*/
/*     clicks  concatMap      subscribe
next ----0-------->0 ....o ------>o
error    x 
complete x
*/

/*       fakeData
      next      o
      error     o
      complete  o
*/
/*
const source = fakeGetData().pipe(
    catchError(err => {
        print('saw error:' + err.message, 'line-one');
        return throwError('throw error');
    })
);

source.subscribe(
    x => { print(x, 'line-one'); },
    error => { print(error, 'line-two'); }
);
*/

/*
const observable = Observable.create((observer: Observer<string>) => {
    observer.next('hello');
    observer.next('world');
    observer.next('Test');
    observer.complete();
});

observable.subscribe((val: string) => print(val));

const clicks = fromEvent(document, 'click');

clicks.subscribe((click) => print(click.type));

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('resolved!');
    }, 2000);
});

const obsvPromise = from(promise);

obsvPromise.subscribe((result: string) => print(result));

const alarmclock = timer(1000);

alarmclock.subscribe((done) => print('ding!!!'));

const myinterval = interval(1000);

myinterval.subscribe((int) => print((new Date().getSeconds()).toString()));

const mashup = of('anything', ['you', 'want'], 23, true, { cool: 'stuff' });

mashup.subscribe((mashup) => print(JSON.stringify(mashup)));

const cold = Observable.create((observer: Observer<number>) => {
    observer.next(Math.random());
});

cold.subscribe((a: number) => print(`Subscriber A: ${a}`));
cold.subscribe((b: number) => print(`Subscriber B: ${b}`));

const x = Math.random();
const hot = Observable.create((observer: Observer<number>) => {
    observer.next(x);
});

hot.subscribe((a: number) => print(`Subscriber A: ${a}`));
hot.subscribe((b: number) => print(`Subscriber B: ${b}`));

const cold2 = Observable.create((observer: Observer<number>) => {
    observer.next(Math.random());
});

const hot2 = cold2.pipe(publish());

hot2.subscribe((a: number) => print(`Subscriber A: ${a}`));
hot2.subscribe((b: number) => print(`Subscriber B: ${b}`));

hot2.connect();

const finalizeTimer = timer(1000);
finalizeTimer.pipe(finalize(() => print('All done!'))).subscribe();

const finalizeInterval = interval(500).pipe(finalize(() => print('All done!')));

const subscription = finalizeInterval.subscribe((x) => print('finalizeInterval:' + x));

setTimeout(() => {
    subscription.unsubscribe();
}, 3000);

const numbers = of(10, 100, 1000);

numbers.pipe(
    map((num) => Math.log(num)))
    .subscribe((x) => print(x.toString()));

const jsonString = '{ "type": "Dog", "breed": "Pug" }';
const apiCall = of(jsonString);

apiCall.pipe(map((json) => JSON.parse(json)))
    .subscribe((obj) => {
        print(obj.type);
        print(obj.breed);
    });

const names = of('Simon', 'Garfunkle');

names
    .pipe(
        tap((name) => print(name)),
        map((name) => name.toUpperCase()),
        tap((name) => print(name)))
    .subscribe();

const numbersv2 = of(-3, 5, 7, 2, -7, 9, -2);

numbersv2.pipe(
    filter((n) => n >= 0)).subscribe((n) => print(n.toString()));

numbersv2.pipe(first()).subscribe((n) => print(n.toString()));

numbersv2.pipe(last()).subscribe((n) => print(n.toString()));

const mouseEvents = fromEvent(document, 'mousemove');

mouseEvents.pipe(throttleTime(1000))
    .subscribe((e) => print(e.type));

mouseEvents.pipe(debounceTime(1000))
    .subscribe((e) => print(e.type));

const gameClicks = fromEvent(document, 'click');

gameClicks.pipe(
    map((e) => parseInt((Math.random() * 10).toString(), 10)),
    tap((score) => print(`Click scored + ${score}`)),
    scan((highScore, score) => highScore + score))
    .subscribe((highScore) => print(`High Score ${highScore}`));

const intervalClicks = fromEvent(document, 'click');

intervalClicks.pipe(
    switchMap((click) => {
        return interval(500);
    })).subscribe((i) => print(i.toString()));

const intervaltick = interval(500);
const notifier = timer(2000);

intervaltick.pipe(takeUntil(notifier));

const namestakewhile = of('Bob', 'Jeff', 'Doug', 'Steve');

namestakewhile.pipe(
    takeWhile((name) => name !== 'Doug'),
    finalize(() => print('Complete! I found Doug')))
    .subscribe((i) => print(i));

const yin = of('peanut butter', 'wine', 'rainbows');
const yang = of('jelly', 'cheese', 'unicorns');

const combo = zip(yin, yang);

combo.subscribe((arr) => print(arr.toString()));

const yinv2 = of('peanut butter', 'wine', 'rainbows');
const yangv2 = of('jelly', 'cheese', 'unicorns').pipe(delay(2000));

const combov2 = forkJoin(yin, yang);

combov2.subscribe((arr) => print(arr.toString()));

const throwErrorObservable = throwError('catch me!');
throwErrorObservable.pipe(
    catchError((err) => of(`Error caught: ${err}`)),
    retry(2))
    .subscribe((val: string) => print(val), (e) => print(e));

const subject = new Subject();
const subA = subject.subscribe((val) => print(`Sub A: ${val}`));
const subB = subject.subscribe((val) => print(`Sub B: ${val}`));

subject.next('Hello');

setTimeout(() => {
    subject.next('World');
}, 1000);

const observableforMulticast = fromEvent(document, 'click');

const multiCastClicks: any = observableforMulticast.pipe(
    tap((_) => print('Do One Time!')),
    multicast(() => new Subject()),
);

const subAformulti = multiCastClicks.subscribe((c: any) => print(`Sub A: ${c.timeStamp}`));
const subBformulti = multiCastClicks.subscribe((c: any) => print(`Sub B: ${c.timeStamp}`));

multiCastClicks.connect();

const input1 = document.querySelector('#input1');
const input2 = document.querySelector('#input2');

const span = document.querySelector('span');

const obsInput1 = fromEvent(input1, 'input');
const obsInput2 = fromEvent(input2, 'input');

obsInput1.pipe(
    mergeMap(
        (event1) => obsInput2.pipe(
            map((event2) => (event1.target as HTMLInputElement).value + ' ' + (event2.target as HTMLInputElement).value),
        ),
    ),
).subscribe(
    (combinedValue) => { span.textContent = combinedValue; console.log('test'); },
);

const numbersMerge1 = of(1, 2, 3);

const numbersMerge2 = of(5, 10, 15);

numbersMerge1.pipe(
    switchMap(
        (number1) => numbersMerge2.pipe(
            map((number2) => number1 * number2),
        ),
    ),
).subscribe(
    (combined) => print(combined.toString()),
);

/*
const click$ = fromEvent(buttonone, 'click');
const interval$ = interval(1000);

const clicksToInterval$ = click$.pipe(
    map((event) => {
        return interval$;
    }),
);

clicksToInterval$.pipe(
    mergeAll(),
).subscribe((num) => print(num.toString()));
 */
/* OR */
/*
click$.pipe(
    map((event) => {
        return interval$;
    }),
    mergeAll(),
).subscribe((num) => print(num.toString()));
*/

/*
clicksToInterval$.subscribe((intervalObservable$) => {
    intervalObservable$.subscribe((num) => {
      print(num.toString());
    });
 });
*/

/*
const button = document.querySelector('button');
const buttonone = document.querySelector('button#one');
const buttontwo = document.querySelector('button#two');
const buttonthree = document.querySelector('button#three');

fromEvent(button, 'click').subscribe((event) => {
 interval(1000).subscribe((num) => {
    print(num.toString());
 });
});

const clickthree$ = fromEvent(buttonthree, 'click');
const intervalthree$ = interval(1000);

const clicksToIntervalthree$ = clickthree$.pipe(
    concatMap((event) => intervalthree$),
);
// map() + concatAll() = concatMap()
clicksToIntervalthree$.subscribe((num: number) => print(num.toString() + ' dogs'));

const click$ = fromEvent(buttonone, 'click');
const interval$ = interval(1000);

const clicksToInterval$ = click$.pipe(
    mergeMap((event) => interval$),
);
// map() + mergeAll() = mergeMap()
clicksToInterval$.subscribe((num: number) => print(num.toString() + ' sheeps'));

const clicktwo$ = fromEvent(buttontwo, 'click');
const intervaltwo$ = interval(1000);

const clicksToIntervaltwo$ = clicktwo$.pipe(
    switchMap((event) => intervaltwo$),
);
// map() + switchAll() = switchMap()
clicksToIntervaltwo$.subscribe((num: number) => print(num.toString() + ' cats'));

// emit delay value
const source = of(3000, 2000);

// map value from source into inner observable, when complete emit result and move to next
const concatMapExample = source.pipe(
  concatMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val))),
);
// output: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
concatMapExample.subscribe((val) =>
  print(`With concatMap: ${val}`),
);

const mergeMapExample = source
  .pipe(
    mergeMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val))),
  );

mergeMapExample.subscribe((val) => print(`With mergeMap: ${val}`));
*/
/*
const clicksToInterval$ = click$.pipe(
    map((event) => interval$),
);
// map() + switchAll() = switchMap()
clicksToInterval$.pipe(
    switchAll(),
).subscribe((num: number) => print(num.toString() + ' sheeps'));
*/
/*
function mergeMap(innerObservable: any) {

    // the click observable, in our case
    const source = this;

    return new Observable((observer) => {
      source.subscribe((outerValue: any) => {

        // innerObservable — the interval observable, in our case
        innerObservable(outerValue).subscribe((innerValue: any) => {
          observer.next(innerValue);
        });
     });
    });
}

class MyObservable() {
}

function mySwitchMap(innerObservable: any) {
    // the click observable, in our case
    const source = this;

    return new Observable(observer =》 {
        source.subscribe(outValue => {
            innerSubscription && innerSubscription.unsubscribe();

            // innerObservable - the internal observable, in our case
            innerSubscription = innerObservable(outerValue).subscribe(innerValue => {
                observer.next(innerValue);
            })
        })
    })
}

MyObservable.prototype.mergeMap = mergeMap;
*/
/*
// Subject
const simpleSubject = new Subject();

// subscriber 1
simpleSubject.subscribe((data) => {
    print('Subject Subscriber A: ' + data);
});

simpleSubject.next(Math.random());
simpleSubject.next(Math.random());

// subscriber 2
simpleSubject.subscribe((data) => {
    print('Subject Subscriber B: ' + data);
});

simpleSubject.next(Math.random());


// BehaviorSubject
const behaviorSubject = new BehaviorSubject(0);

// subscriber 1
behaviorSubject.subscribe((data) => {
    print('BehaviorSubject Subscriber A: ' + data);
});

behaviorSubject.next(Math.random());
behaviorSubject.next(Math.random());

// subscriber 2
behaviorSubject.subscribe((data) => {
    print('BehaviorSubject Subscriber B: ' + data);
});

behaviorSubject.next(Math.random());

print('BehaviorSubject value: ' + behaviorSubject.value);


// ReplaySubject
const replaySubject = new ReplaySubject(2);

// subscriber 1
replaySubject.subscribe((data) => {
    print('ReplaySubject Subscriber A:' + data);
});

replaySubject.next(Math.random())
replaySubject.next(Math.random())
replaySubject.next(Math.random())

// subscriber 2
replaySubject.subscribe((data) => {
    print('ReplaySubject Subscriber B:' + data);
});

replaySubject.next(Math.random());


const stopNotifier = timer(1001);
const intervalSubject = new ReplaySubject(2, 100);

// subscriber 1
intervalSubject.pipe(
    takeUntil(stopNotifier)
)
.subscribe((data) => {
    print('intervalSubject ReplaySubject Subscriber A:' + data);
});

setInterval(() => intervalSubject.next(Math.random()), 200);

// subscriber 2
setTimeout(() => {
  intervalSubject.pipe(
    takeUntil(stopNotifier)
).subscribe((data) => {
    print('intervalSubject ReplaySubject Subscriber B:' + data);
  });
}, 1000);

const asyncSubject = new AsyncSubject();

// subscriber 1
asyncSubject.subscribe((data) => {
    print('asyncSubject Subscriber A:' + data);
});

asyncSubject.next(Math.random())
asyncSubject.next(Math.random())
asyncSubject.next(Math.random())

// subscriber 2
asyncSubject.subscribe((data) => {
    print('asyncSubject Subscriber B:' + data);
});

asyncSubject.next(Math.random());
asyncSubject.complete();
*/
// todo: combineLatest, fromLatest

/*
// todo: COLD and HOT

// COLD is when your observable creates the producer
// COLD
const coldObs = new Observable((observer) => {
    const producer = new Producer();
    // have
})

// HOT is when your observable closes over the producer
// HOT
var producer = new Producer();
var hot = new Observable((observer) => {
  // have observer listen to producer here
});


 // `publish()` and `share()`

function makeHot(cold) {
  const subject = new Subject();
  cold.subscribe(subject);
  return new Observable((observer) => subject.subscribe(observer));
}

function makeHotRefCounted(cold) {
  const subject = new Subject();
  const mainSub = cold.subscribe(subject);
  let refs = 0;
  return new Observable((observer) => {
    refs++;
    let sub = subject.subscribe(observer);
    return () => {
      refs--;
      if (refs === 0) mainSub.unsubscribe();
      sub.unsubscribe();
    };
  });
}
*/

/*
//emit value in sequence every 1 second
const source_interval = interval(1000);
//output: 0,1,2,3,4,5....
const subscribe = source_interval.subscribe(val => print(val + ''));
*/

/*

//emit every 5s
const fastSource = interval(5000);
//emit every 1s
const FastSecondSource = interval(1000);
const exampleFast = fastSource.pipe(
  withLatestFrom(FastSecondSource),
  map(([first, second]) => {
    return `First Source (5s): ${first}, Second Source (1s): ${second}`;
  })
);

//  "First Source (5s): 0 Second Source (1s): 4"
//  "First Source (5s): 1 Second Source (1s): 9"
//  "First Source (5s): 2 Second Source (1s): 14"

const subscriptionFast = exampleFast.subscribe(val => print(val, 'line-two'));


//emit every 5s
const slowSource = interval(5000);
//emit every 1s
const slowSecondSource = interval(1000);
//withLatestFrom slower than source
const exampleSlow = slowSecondSource.pipe(
  //both sources must emit at least 1 value (5s) before emitting
  withLatestFrom(slowSource),
  map(([first, second]) => {
    return `Source (1s): ${first}, Latest From (5s): ${second}`;
  })
);
const subscriptionSlow = exampleSlow.subscribe(val => print(val, 'line-one'));
/*
  "Source (1s): 4 Latest From (5s): 0"
  "Source (1s): 5 Latest From (5s): 0"
  "Source (1s): 6 Latest From (5s): 0"
  ...
*/

/*
const source = interval(1000).pipe(take(10));

source.subscribe(x => console.log({x}));

setTimeout(() => {
source.subscribe(a => console.log({a})) }, 2000);


const sub = new Subject();
const sourcetwo = interval(1000).pipe(take(10));

sub.asObservable().subscribe(y => console.log({y}));

setTimeout(() => { sub.asObservable().subscribe(a => console.log({a})) }, 3000);

sourcetwo.subscribe(sub);

// connect() {}
*/
/*
const sourcethree = interval(1000).pipe(take(10), multicast(new Subject<number>())) as ConnectableObservable<number>;

sourcethree.subscribe(z => console.log({z}));
setTimeout(() => { sourcethree.subscribe(v => console.log({v})) }, 3000);

sourcethree.connect();
*/

/*
const sourcefour = interval(1000).pipe(take(10), publish());
sourcefour.connect();
sourcefour.subscribe(z => console.log({z}));
setTimeout(() => { sourcefour.subscribe(v => console.log({v})) }, 3000);
*/

/* 
const sourcethreepointfive = ajax.getJSON('http://localhost:3000/users').pipe(multicast(new Subject<any>())) as ConnectableObservable<any>

sourcethreepointfive.connect();

sourcethreepointfive.subscribe(x => console.log({x}));

sourcethreepointfive.subscribe(y => console.log({y}));
 */
/*
const sourcefive = ajax.getJSON('http://localhost:3000/users').pipe(publish()) as ConnectableObservable<any>;

sourcefive.connect();

sourcefive.subscribe(x => console.log({x}));

sourcefive.subscribe(y => console.log({y}));
*/

/*

const sourcesix = ajax.getJSON("http://localhost:3000/users").pipe(share());

const subscription = sourcesix.subscribe(x => console.log({ x }));

const subscriptionone = sourcesix.subscribe(a => console.log({ a }));

setTimeout(() => {
  subscription.unsubscribe();
  subscriptionone.unsubscribe();
  sourcesix.subscribe(x => console.log({ x }));
}, 2000);
*/

/*
const trigger$ = interval(1000).pipe(startWith(0));
trigger$.subscribe(value => print(value, "one"));
*/

/*
const trigger$ = timer(0, 1000);
trigger$.subscribe(value => print(value, "one"));

const triggertwo$ = interval(1000);
triggertwo$.subscribe(value => print(value, "two"));

const triggerthree$ = interval(1000).pipe(startWith(0));
triggerthree$.subscribe(value => print(value, "three"));
*/

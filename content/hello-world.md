---
title: "Official NgRx Counter Example"
date: "2020-01-07"
---


## Implementing the counter example from the official docs

Trying this our on the counter example form the official docs.

```bash
nx g @nrwl/angular:app stratum
Cannot find module '@nrwl\angular\package.json'
Require stack:
- C:\Users\timof\repos\timofey
...
```

Same for this:

```bash
nx generate @nrwl/angular:app
```

This fixed it:

```bash
yarn add @nrwl/angular
```

Next step:

### Install NgRx

Three methods are shown:

```bash
npm install @ngrx/store --save
yarn add @ngrx/store
ng add @ngrx/store
```

That only adds the package. The below will do a lot more:

```bash
ng add @ngrx/store --minimal false
The add command requires to be run in an Angular project, but a project definition could not be found.
```

Changing into the stratum directory, we get this error:
_The add command requires to be run in an Angular project, but a project definition could not be found._

Using that command is a nice idea, but not working and not necessary for our goal of creating unit tests for the counter example. So on with that for now.

### 1. Define actions to express events

Create a new file named counter.actions.ts to describe the counter actions to increment, decrement, and reset its value.

Creating a store directory to hold these files.

### 2. Define a reducer function to manage the state

Define a reducer function to handle changes in the counter value based on the provided actions.

The example shows creation of a counter.reducer.ts file.

### 3. Register the global state container that is available throughout the application

Import the StoreModule from @ngrx/store and the counter.reducer file in the app.module.ts file.

Add the StoreModule.forRoot function in the imports array of your AppModule with an object containing the count and the counterReducer that manages the state of the counter. The StoreModule.forRoot() method registers the global providers needed to access the Store throughout your application.

### 4. Inject the Store service to dispatch actions and select the current state

Create a new Component named my-counter in the app folder. Going to change the name a bit. I'm pretty over the "my-whatever" naming convention for tutorials, so we will just call it "counter" not "my-counter".

We can use nx for this step.

```bash
ng generate component counter --project=stratum
```

Another example shows this flag:

```bash
ng g c components/counter --project=stratum --skip-import
```

There is also the nx way of doing things:

```bash
nx g component counter --project=stratum
Schematic "component" not found in collection "@nrwl/web".
```

That error came up in the Quallasuyu project. It was fixed with something like this:

```bash
yarn add @schematics/angular
yarn add @schematics/web
>nx g component counter --project=stratum
Schematic "component" not found in collection "@nrwl/web".
```

Or not. Let's look at some more examples.

```bash
nx generate @nrwl/angular:component counter --project=stratum
```

This works. Took a while, but we have a counter component now. Should have put it in a components directory. Next time. The naming convention used by nx gives us this:

```bash
<clades-counter>
```

Inject the Store service into your component to dispatch the counter actions, and use the select operator to select data from the state.

Update the MyCounterComponent template with buttons to call the increment, decrement, and reset methods. Use the async pipe to subscribe to the count\$ observable.

Update the MyCounterComponent class with a selector for the count, and methods to dispatch the Increment, Decrement, and Reset actions.

Add the MyCounter component to your AppComponent template.

### Use the Redux devtools

Install the Redux devtools for the Chrome browser by finding the "add more tools" link which will open [this page](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

Currently, nothings shows up (unless you have another app open which uses a store, in which case you might see that store).

_No store found. Make sure to [follow the instructions](https://github.com/zalmoxisus/redux-devtools-extension#usage)._

The counter is working and using the store. So an extra few steps are required. Looking at [this article](*https://alligator.io/angular/ngrx-store-redux-devtools/).

```bash
yarn add @ngrx/store-devtools
npm install @ngrx/store-devtools --save
```

In the app.module.ts file, import StoreDevtoolsModule and add it to your NgModule’s imports:

After this, in the Chrome inspector/Redux tab, we see the actions working on the counter. How great is that?!

## NgRx counter example

Here is a brief walk through of the tutorial example from the official NgRx docs.
[The counter tutorial is briefly explained with](https://ngrx.io/guide/store#tutorial) some code. I have broken it down into four steps.0

1. Define actions to express events.
2. Define a reducer function to manage the state of the counter.
3. Register the global state container that is available throughout the application.
4. Inject the Store service to dispatch actions and select the current state of the counter.

In more detail.

### Step 1: Define actions to express events

Create a new file named counter.actions.ts to describe the counter actions to increment, decrement, and reset its value.

### Step 2: Define a reducer function to manage the state

Define a reducer function to handle changes in the counter value based on the provided actions.

### Step 3: Register the global state container that is available throughout the application

Import the StoreModule from @ngrx/store and the counter.reducer file.

Add the StoreModule.forRoot function in the imports array of your AppModule with an object containing the count and the counterReducer that manages the state of the counter. The StoreModule.forRoot() method registers the global providers needed to access the Store throughout your application.

### Step 4: Inject the Store service to dispatch actions and select the current state

Create a new Component named my-counter in the app folder. Inject the Store service into your component to dispatch the counter actions, and use the select operator to select data from the state.

Update the MyCounterComponent template with buttons to call the increment, decrement, and reset methods. Use the async pipe to subscribe to the count\$ observable.

Update the MyCounterComponent class with a selector for the count, and methods to dispatch the Increment, Decrement, and Reset actions.

Add the MyCounter component to your AppComponent template.

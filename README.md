# CapFiDiploma

## How To Install Dependencies

First install required dependencies:

You'll need local ethereum node, I recommend `ganache-cli`. You can install it from `npm`.

```sh
npm install -g ganache-cli
```

Then install contract dependencies:

```
yarn install
```

To install frontend dependencies go to `front` folder and run `yarn install` from there:

```sh
cd front
yarn install
```

## How To Test

First make sure that local ethereum node is running. Execute:

```sh
ganache-cli -p 7545
```

Now you can compile and deploy contracts:

```sh
truffle compile && truffle migrate
```



## How To Run

Make sure that you have local ethereum node running:

```sh
ganache-cli -p 7545
```

And contracts deployed:

```sh
truffle compile && truffle migrate
```

If everything is fine – run the frontend:

```sh
cd front
yarn start
```


You can remove all minted tokens by migrating your contract again:

```sh
truffle migrate --reset
```
Special thanks : for [my blog](http://maksimivanov.com) series about non-fungible token, where we were doing CryptoKitties clone.

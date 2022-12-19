# Analysing ME sales

Our goal is to analyze all Magic Eden sales!
Your job is to: Write a class-based program that parses a signature into a Magic
Eden Sale object.

Input
A Base58 Signature - could be of any kind

Output
If it is a Magic Eden sale, the program should return an object containing the
following information (class-based representation)
1. Buyer wallet
2. Seller wallet
3. Mint account address
4. Price of the sale
5. Blocktime

If not:
Return null;

Examples Cases
1. 
```
1SBmEALmiFY14RrNj4iFk5rvpH4CnxCoqxi9toxcqQF5oPyLDsZQJCodd956KcascJt92fHTprpE7WQ5mrYtssa

buyerWallet: 7EBpUi6tX2vg1FUM9hCpQGgHmGz94ADgwtXLJdTfoAqS
sellerWallet: 62rjFgJCzAyrLuRWRKpYmj6UectiwNiyKFLb3QrvJNEb
price: 1.99
mint: 8QzafcsJ3fwFkhjCjdiv3ULpjb7JQLnSCCqxNtWaKMyH
blocktime: 1635951963
```
2. 
```
mjKDz4d7ga7CusUrYrbM4iu3FtwT5izHAUq6RdRj3nfg5xuZjmKJsMX7qmQx1AxSVybUJ4rRDwpXApfUQ4ZywCQ

buyerWallet: HGEj9nJHdAWJKMHGGHRnhvb3i1XakELSRTn5B4otmAhU
sellerWallet: 2KioHXd6DjjYjHgvXGkPSahfjYiRLBiQv3JFT5xjUL82
price: 44.68
mint: FEaeycyomjXsv4H91keKi8cWPBTCYnSm8p77T3ZehVxU
blocktime: 1643204286
```
3. 
```
28MXGCBRfkbqdcw6zGknjR8wQJ6QXUgCkveqzPiqLFEcZXiJCUCYcGkFgLBQNypzfD9qmNVbyVTB6pXbzndBcDgq

buyerWallet: GGJh8Werqx7XqXvc6apdMNGr4gc738RPZg27VD4Wsk32
sellerWallet: CVFGZSfti6AdtJ8dyisuUS4GWtvdozmzHe7cuenA4jqN
price: 24
mint: 6dXi3L6vuxz3matDfnbLGkgNaGdRsDPTyNDke9mCNcK6
blocktime: 1669299927
```
4. 
```
2xL31nrZw2guKPGTdbx1dYRmCZ6y5deMttDQGSLJJyCaiuQrBVGjuYWxeChUmgGSJLRcqe3WBzyqjXRWYSYdh9QL

buyerWallet: 2mebnp4nekNzcTa3k6Fd7Qw5kVW6gVsiRp2stTpF6dsG
sellerWallet: H2kgTa9VfxPZDTy34RiZqJopfZBNkMt719jUmdfpUuUf
price: 23.28
mint: 2xKoiKJrcQVFfdUpdyzbRhFcccg2ThYHC7H9WBVn8Rw8
blocktime: 1671298531
```


# How to Execute Code
1. create .env file
2. put the rpc url and signature you want analyze
3. yarn
4. yarn start
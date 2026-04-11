import express from 'express';
import {body, params}   from 'express-validator';
import {getCart, getCartById, getCartByUser} from '../Controllers/cartController.js';
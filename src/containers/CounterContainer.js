import React from 'react';
import Counter from '../components/Counter';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAsync, increaseAsync } from '../modules/counter';

const CounterContainer = () => {
  const { counter } = useSelector(state => state);

  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increaseAsync());
  };

  const onDecrease = () => {
    dispatch(decreaseAsync());
  };

  return <Counter number={counter} onIncrease={onIncrease} onDecrease={onDecrease} />;
};

export default CounterContainer;

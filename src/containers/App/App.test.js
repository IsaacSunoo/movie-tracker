import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { shallow } from 'enzyme';
import { mapStateToProps, mapDispatchToProps } from '../App/App';
import { getMovies } from '../../actions/index';

describe('App', () => {
  let wrapper;
  let mockMovies;

  beforeEach(() => {
    wrapper = shallow(
      <App />
    )
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('fetchRecentMovies', () => {
    beforeEach(() => {
      fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData),
      }));
    });

    it('should return requested data', () => {
      mockMovies = {results: [{name: 'Mason'}, {name: 'Isaac'}]};

    });
    it('should throw an error when response is not ok', async () => {
      fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        ok: false
      }));
      // wrapper.instance().fetchRecentMovies()
      // .catch(error => {
      //   expect(error.message).toBe('Response not ok')
      // })

    });

    it('should call getMovies if response is ok', () => {

    })

  });

  describe('mapStateToProps', () => {
    it('should return an object', () => {
      const mockData = {
        loginUser: {},
        favorites: []
      }

      const expected = {
        favorites: [],
        loginUser: {}
      }

      const mockProps = mapStateToProps(mockData);
      expect(mockProps).toEqual(expected);
    })
  })

  describe("mapDispatchToProps", () => {
    it("should call dispatch for getMovies", () => {
      mockMovies = [{ name: 'Requis' }, { name: 'Hoit' }, { name: 'Tony' }]
      const mockDispatch = jest.fn()
      const actionToDispatch = getMovies(mockMovies)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.getMovies(mockMovies)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });

  })

});



// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

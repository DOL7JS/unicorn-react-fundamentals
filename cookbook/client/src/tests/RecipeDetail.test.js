import RecipeDetail from '../components/RecipeDetail'
import { render, screen } from '@testing-library/react'




test('recipe detail test',()=>{

    render(<RecipeDetail></RecipeDetail>)


    const element = screen.getByTestId('recipe-detail-title')

    expect(element).toBeInTheDocument()


})
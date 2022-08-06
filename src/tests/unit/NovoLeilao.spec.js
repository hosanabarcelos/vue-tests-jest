import NovoLeilao from '@/views/NovoLeilao';
import { mount } from '@vue/test-utils';
import { createLeilao } from '@/http';

jest.mock('@/http');

const $router = {
    push: jest.fn()
}

describe('Um novo leilão deve ser criado', () => {
    test('Dado o formulário preenchido, um leilão é criado', () => {
        createLeilao.mockResolvedValueOnce()

        const wrapper = mount(NovoLeilao, {
            mocks: {
                $router
            }
        });
        wrapper.find('.produto').setValue('Viver em paz para morrer em paz');
        wrapper.find('.descricao').setValue('Um livro by Cortella');
        wrapper.find('.valor').setValue(80);
        wrapper.find('form').trigger('submit');

        expect(createLeilao).toHaveBeenCalled(); 
    });
});
import Leilao from '@/components/Leilao';
import { mount } from '@vue/test-utils';

const leilao = {
    produto: 'Viver em paz para morrer em paz',
    lanceInicial: 50,
    descricao: 'Um livro de Cortella'
}

describe('Um leilão exibe os dados do produto', () => {
    test('Exibe os dados do leilão no card', () => {
        const wrapper = mount(Leilao, {
            propsData: {
                leilao
            }
        })
        const header = wrapper.find('.card-header').element;
        const title = wrapper.find('.card-title').element;
        const text = wrapper.find('.card-text').element;

        expect(header.textContent).toContain(`Estamos leiloando um(a): ${leilao.produto}`);
        expect(title.textContent).toContain(`Lance inicial: R$ ${leilao.lanceInicial}`);
        expect(text.textContent).toContain(leilao.descricao);
    });
});
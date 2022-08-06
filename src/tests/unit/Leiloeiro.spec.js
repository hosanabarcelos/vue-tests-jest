import Leiloeiro from '@/views/Leiloeiro';
import { getLeilao, getLances } from '@/http';
import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';

jest.mock('@/http');

const leilao = {
    produto: 'Viver em paz para morrer em paz',
    lanceInicial: 50,
    descricao: 'Um livro de Cortella'
}

const lances = [
    {
        id: 1,
        valor: 100,
        data: '2022-08-06',
        leilao_id: 1
    },
    {
        id: 2,
        valor: 200,
        data: '2022-08-06',
        leilao_id: 1
    },
    {
        id: 3,
        valor: 300,
        data: '2022-08-06',
        leilao_id: 1
    }
]

describe('Leiloeiro inicia um leilão que não possui lances', () => {
    test('Avisa quando não existem lances', async () => {

        getLeilao.mockResolvedValueOnce(leilao);
        getLances.mockResolvedValueOnce([]);

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        });

        await flushPromises();

        const alerta = wrapper.find('.alert-dark');
        expect(alerta.exists()).toBe(true);
    });
});

describe('Um leiloeiro exibe os lances existentes', () => {
    test('Não mostra o aviso de "Sem lances"', async () => {
        getLeilao.mockResolvedValueOnce(leilao);
        getLances.mockResolvedValueOnce(lances);

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        });

        await flushPromises();
        const alerta = wrapper.find('.alert-dark');
        expect(alerta.exists()).toBe(false);
    });
    test('Possui uma lista de lances', async () => {
        getLeilao.mockResolvedValueOnce(leilao);
        getLances.mockResolvedValueOnce(lances);

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        });

        await flushPromises();
        const alerta = wrapper.find('.list-inline');
        expect(alerta.exists()).toBe(true);
    });
});

describe('Um leiloeiro comunica os valores de menor e maior lance', () => {
    test('Mostra o maior lance daquele leilão', async () => {
        getLeilao.mockResolvedValueOnce(leilao);
        getLances.mockResolvedValueOnce(lances);

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        });

        await flushPromises();
        const maiorLance = wrapper.find('.maior-lance');
        expect(maiorLance.element.textContent).toContain('Maior lance: R$ 300');
    });
    test('Mostra o menor lance daquele leilão', async () => {
        getLeilao.mockResolvedValueOnce(leilao);
        getLances.mockResolvedValueOnce(lances);

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        });

        await flushPromises();
        const menorLance = wrapper.find('.menor-lance');
        expect(menorLance.element.textContent).toContain('Menor lance: R$ 100');
    });
});
import Avaliador from '@/views/Avaliador';
import { getLeiloes } from '@/http';
import { mount, RouterLinkStub } from '@vue/test-utils';
import flushPromises from 'flush-promises';

jest.mock('@/http');

const leiloes = [
    {
        produto: 'Um dia de sábado chuvoso',
        lanceInicial: 40,
        descricao: 'Livro',
    },
    {
        produto: 'Biografia Steve Vai',
        lanceInicial: 200,
        descricao: 'Livro sobre o guitarrista',
    },
]

describe('Um avaliador que se conecta com a API', () => {
    test('Garantir que ele mostre todos os leilões retornados pela API', async () => {
        getLeiloes.mockResolvedValueOnce(leiloes);

        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
        await flushPromises();

        const totalLeiloesExibidos = wrapper.findAll('.leilao').length;
        expect(totalLeiloesExibidos).toBe(leiloes.length);
    });
    test('Não existem leilões retornados pela API', async () => {
        getLeiloes.mockResolvedValueOnce([]);

        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
        await flushPromises();

        const totalLeiloesExibidos = wrapper.findAll('.leilao').length;
        expect(totalLeiloesExibidos).toBe(0);
    });
});
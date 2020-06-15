import { RefDTO } from "./ref.dto";
import { PagamentoDTO } from "./pagamento.dto";
import { ItemPedidoDTO } from "./item.pedido";

export interface PedidoDTO{
    cliente : RefDTO;
    enderecoDeEntrega : RefDTO;
    pagamento : PagamentoDTO;
    items : ItemPedidoDTO[];
    
}
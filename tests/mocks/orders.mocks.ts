const allOrdersMock = [
	{
		id: 1,
		userId: 1,
		productIds: [
			2,
			1
		]
	},
	{
		id: 2,
		userId: 3,
		productIds: [
			4,
			3
		]
	},
	{
		id: 3,
		userId: 2,
		productIds: [
			5
		]
	}
];

const allOrdersMockAfter = [
			{
				id: 2,
				name: 'Product 1',
				orderId: 1
			},
			{
				id: 1,
				name: 'Product 2',
				orderId: 1
			},
];

const ordersMock = [
	{
		id: 1,
		userId: 1,
		productIds: [			  {
			id: 1,
			name: "Excalibur",
			price: "10 peças de ouro",
			orderId: 1
		},
		{
			id: 2,
			name: "Espada Justiceira",
			price: "20 peças de ouro",
			orderId: 1
		}],
	}
];

const ordersMockServiceReturn = [
	{
		id: 1,
		userId: 1,
		productIds: [1, 2]
	}
];

const newOrder = {
  userId: 1,
  productIds: [1, 2]
}

export default {
  allOrdersMock,
	newOrder,
	allOrdersMockAfter,
	ordersMock,
	ordersMockServiceReturn
};